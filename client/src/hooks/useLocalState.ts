import { useState, type SetStateAction } from "react";

export default function useLocalState<T>(initialState: T, key: string) {
    const [state, setState] = useState<T>(() => {
        const storage = localStorage.getItem(key);

        if (!storage) {
            return initialState;
        };

        const data = JSON.parse(storage);
        return data;
    });

    const setLocalState = (value: SetStateAction<T>) => {
        setState((prevState: T) => {
            const input: T =
                typeof value === 'function'
                    ? (value as (prevState: T) => T)(prevState)
                    : value as T;

            localStorage.setItem(key, JSON.stringify(input));
            return input;
        });
    };

    const clearLocalStorage = () => {
        setState(initialState);
        localStorage.removeItem(key);
    };

    return { state, setLocalState, clearLocalStorage };
}