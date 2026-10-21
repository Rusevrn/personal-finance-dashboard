import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import useFetch from './useFetch';

describe('useFetch', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn());
    });

    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    describe('request', () => {
        it('returns parsed JSON from a successful response', async () => {
            const responseData = { id: 1, name: 'Peter' };

            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue(responseData),
            });

            const { result } = renderHook(() => useFetch(null, null));

            await expect(result.current.request('data/accounts')).resolves.toEqual(responseData);

            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3030/data/accounts',
                expect.objectContaining({
                    headers: {},
                }),
            );
        });

        it('passes a custom HTTP method', async () => {
            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue({}),
            });

            const { result } = renderHook(() => useFetch(null, null));

            await result.current.request('data/accounts/123', { method: 'PATCH' });

            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3030/data/accounts/123',
                expect.objectContaining({ method: 'PATCH' }),
            );
        });

        it('serializes the payload and sets the content type', async () => {
            const payload = { openingBalance: 2000 };

            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue({}),
            });

            const { result } = renderHook(() => useFetch(null, null));

            await result.current.request('data/accounts/123', {
                method: 'PATCH',
                payload,
            });

            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3030/data/accounts/123',
                expect.objectContaining({
                    method: 'PATCH',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(payload),
                }),
            );
        });

        it('adds the authorization header when a token is supplied', async () => {
            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue({}),
            });

            const { result } = renderHook(() => useFetch(null, null));

            await result.current.request('data/accounts', { auth: 'test-token' });

            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3030/data/accounts',
                expect.objectContaining({
                    headers: { 'X-authorization': 'test-token' },
                }),
            );
        });

        it('preserves both headers when payload and authorization are supplied', async () => {
            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue({}),
            });

            const { result } = renderHook(() => useFetch(null, null));

            await result.current.request('data/accounts', {
                method: 'POST',
                payload: { name: 'Peter' },
                auth: 'test-token',
            });

            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3030/data/accounts',
                expect.objectContaining({
                    headers: {
                        'content-type': 'application/json',
                        'X-authorization': 'test-token',
                    },
                    body: JSON.stringify({ name: 'Peter' }),
                }),
            );
        });

        it('throws an error for a non-OK response', async () => {
            fetch.mockResolvedValue({
                ok: false,
                status: 403,
                statusText: 'Forbidden',
            });

            const { result } = renderHook(() => useFetch(null, null));

            await expect(result.current.request('data/accounts')).rejects.toThrow(
                '403: Forbidden',
            );
        });

        it('returns an empty object for a 204 response without parsing JSON', async () => {
            const json = vi.fn();

            fetch.mockResolvedValue({
                ok: true,
                status: 204,
                json,
            });

            const { result } = renderHook(() => useFetch(null, null));

            await expect(result.current.request('data/accounts/123', {
                method: 'DELETE',
            })).resolves.toEqual({});

            expect(json).not.toHaveBeenCalled();
        });

        it('propagates network errors', async () => {
            fetch.mockRejectedValue(new TypeError('Failed to fetch'));

            const { result } = renderHook(() => useFetch(null, null));

            await expect(result.current.request('data/accounts')).rejects.toThrow(
                'Failed to fetch',
            );
        });

        it('passes an AbortSignal to fetch when supplied', async () => {
            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue({}),
            });

            const controller = new AbortController();
            const { result } = renderHook(() => useFetch(null, null));

            await result.current.request('data/accounts', {
                signal: controller.signal,
            });

            expect(fetch).toHaveBeenCalledWith(
                'http://localhost:3030/data/accounts',
                expect.objectContaining({ signal: controller.signal }),
            );
        });
    });

    describe('fetch lifecycle', () => {
        it('starts with the supplied initial data and is not loading', () => {
            const initialData = [{ id: 1 }];

            const { result } = renderHook(() => useFetch(initialData, null));

            expect(result.current.data).toEqual(initialData);
            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(null);
            expect(fetch).not.toHaveBeenCalled();
        });

        it('does not fetch when the URL is missing', async () => {
            const { result } = renderHook(() => useFetch([], null));

            await waitFor(() => {
                expect(result.current.isLoading).toBe(false);
            });

            expect(fetch).not.toHaveBeenCalled();
        });

        it('loads data and finishes loading after a successful fetch', async () => {
            const responseData = [{ id: 1, description: 'Groceries' }];

            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue(responseData),
            });

            const { result } = renderHook(() => useFetch([], 'data/transactions'));

            await waitFor(() => {
                expect(result.current.data).toEqual(responseData);
                expect(result.current.isLoading).toBe(false);
            });

            expect(result.current.error).toBe(null);
        });

        it('stores transformed data when transformData is supplied', async () => {
            const responseData = [
                { id: 1, amount: '25' },
                { id: 2, amount: '40' },
            ];

            const transformData = vi.fn(data =>
                data.map(transaction => ({
                    ...transaction,
                    amount: Number(transaction.amount),
                })),
            );

            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn().mockResolvedValue(responseData),
            });

            const { result } = renderHook(() =>
                useFetch([], 'data/transactions', transformData),
            );

            await waitFor(() => {
                expect(result.current.data).toEqual([
                    { id: 1, amount: 25 },
                    { id: 2, amount: 40 },
                ]);
                expect(result.current.isLoading).toBe(false);
            });

            expect(transformData).toHaveBeenCalledWith(responseData);
        });

        it('stores HTTP errors and finishes loading', async () => {
            fetch.mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            });

            const { result } = renderHook(() =>
                useFetch([], 'data/transactions'),
            );

            await waitFor(() => {
                expect(result.current.error).toEqual(
                    new Error('500: Internal Server Error'),
                );
                expect(result.current.isLoading).toBe(false);
            });
        });

        it('stores network errors and finishes loading', async () => {
            fetch.mockRejectedValue(new TypeError('Failed to fetch'));

            const { result } = renderHook(() =>
                useFetch([], 'data/transactions'),
            );

            await waitFor(() => {
                expect(result.current.error).toEqual(
                    new TypeError('Failed to fetch'),
                );
                expect(result.current.isLoading).toBe(false);
            });
        });

        it('refetches when refreshKey changes', async () => {
            fetch.mockResolvedValue({
                ok: true,
                status: 200,
                json: vi.fn()
                    .mockResolvedValueOnce([{ id: 1 }])
                    .mockResolvedValueOnce([{ id: 1 }, { id: 2 }]),
            });

            const { result, rerender } = renderHook(
                ({ refreshKey }) =>
                    useFetch([], 'data/transactions', undefined, refreshKey),
                { initialProps: { refreshKey: 0 } },
            );

            await waitFor(() => {
                expect(result.current.data).toEqual([{ id: 1 }]);
            });

            rerender({ refreshKey: 1 });

            await waitFor(() => {
                expect(result.current.data).toEqual([{ id: 1 }, { id: 2 }]);
            });

            expect(fetch).toHaveBeenCalledTimes(2);
        });

        it('fetches again when the URL changes', async () => {
            fetch.mockImplementation(async url => ({
                ok: true,
                status: 200,
                json: async () => ({ url }),
            }));

            const { result, rerender } = renderHook(
                ({ url }) => useFetch(null, url),
                { initialProps: { url: 'data/income' } },
            );

            await waitFor(() => {
                expect(result.current.data).toEqual({
                    url: 'http://localhost:3030/data/income',
                });
            });

            rerender({ url: 'data/expenses' });

            await waitFor(() => {
                expect(result.current.data).toEqual({
                    url: 'http://localhost:3030/data/expenses',
                });
            });

            expect(fetch).toHaveBeenCalledTimes(2);
        });

        it('aborts the pending request when unmounted', async () => {
            let receivedSignal;

            fetch.mockImplementation((_url, options) => {
                receivedSignal = options.signal;

                return new Promise(() => { });
            });

            const { unmount } = renderHook(() =>
                useFetch([], 'data/transactions'),
            );

            await waitFor(() => {
                expect(receivedSignal).toBeInstanceOf(AbortSignal);
            });

            unmount();

            expect(receivedSignal.aborted).toBe(true);
        });

        it('does not expose an AbortError as a user-facing error', async () => {
            fetch.mockImplementation((_url, { signal }) =>
                new Promise((resolve, reject) => {
                    signal.addEventListener('abort', () => {
                        reject(new DOMException('The operation was aborted', 'AbortError'));
                    });
                }),
            );

            const { result, unmount } = renderHook(() =>
                useFetch([], 'data/transactions'),
            );

            await waitFor(() => {
                expect(result.current.isLoading).toBe(true);
            });

            unmount();

            // The aborted request should not be surfaced as a regular fetch error.
            // The request is canceled during cleanup; no error UI should be produced.
            expect(result.current.error).toBe(null);
        });
        it('does not let an outdated request overwrite newer data', async () => {
            let resolveFirstRequest;
            let requestCount = 0;

            fetch.mockImplementation(() => {
                requestCount++;

                if (requestCount === 1) {
                    return new Promise(resolve => {
                        resolveFirstRequest = resolve;
                    });
                }

                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: async () => ['new data'],
                });
            });

            const { result, rerender } = renderHook(
                ({ refreshKey }) =>
                    useFetch([], 'data/transactions', undefined, refreshKey),
                { initialProps: { refreshKey: 0 } },
            );

            await waitFor(() => {
                expect(resolveFirstRequest).toBeDefined();
            });

            rerender({ refreshKey: 1 });

            await waitFor(() => {
                expect(result.current.data).toEqual(['new data']);
            });

            resolveFirstRequest({
                ok: true,
                status: 200,
                json: async () => ['outdated data'],
            });

            await waitFor(() => { 
                expect(result.current.data).not.toEqual(['outdated data']);
            });

            expect(result.current.data).toEqual(['new data']);

        });
    });
});