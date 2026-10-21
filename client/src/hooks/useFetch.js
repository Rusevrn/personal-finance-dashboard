import { useCallback, useEffect, useState } from "react";

export default function useFetch(initialState, url, transformData, refreshKey) {
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (urlSuffix, { method, payload, auth, signal } = {}) => {
        let options = {
            headers: {}
        };

        if (method) {
            options.method = method;
        }

        if (payload) {
            options.headers = {
                ...options.headers,
                'content-type': 'application/json'
            };

            options.body = JSON.stringify(payload);
        }

        if (auth) {
            options.headers = {
                ...options.headers,
                'X-authorization': auth
            }
        }

        const response = await fetch(`http://localhost:3030/${urlSuffix}`, { ...options, signal });

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        if (response.status === 204) {
            return {};
        }

        return await response.json();
    }, [])
    /* my hook
        useEffect(() => {
            setIsLoading(true);
            setError(null);
    
            if (!url) {
                setIsLoading(false)
                return
            }
    
            const abortController = new AbortController;
    
            request(url, { signal: abortController.signal })
                .then(result => {
                    setData(transformData ? transformData(result) : result)
                })
                .catch(error => {
                    if (error.name !== 'AbortError') {
                        setError(error)
                    }
                })
                .finally(() => setIsLoading(false));
    
            return () => abortController.abort();
        }, [url, request, transformData, refreshKey])
    
        return { data, setData, isLoading, error, request }
        */
    useEffect(() => {
        let isActive = true;

        setIsLoading(true);
        setError(null);

        if (!url) {
            setIsLoading(false);
            return () => {
                isActive = false;
            };
        }

        const abortController = new AbortController();

        request(url, { signal: abortController.signal })
            .then(result => {
                if (isActive) {
                    setData(transformData ? transformData(result) : result);
                }
            })
            .catch(error => {
                if (isActive && error.name !== 'AbortError') {
                    setError(error);
                }
            })
            .finally(() => {
                if (isActive) {
                    setIsLoading(false);
                }
            });

        return () => {
            isActive = false;
            abortController.abort();
        };
    }, [url, request, transformData, refreshKey]);
    return { data, setData, isLoading, error, request }
}