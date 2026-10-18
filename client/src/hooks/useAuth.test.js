
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, renderHook, act, waitFor } from '@testing-library/react';
import useAuth from './useAuth';

afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.unstubAllGlobals();
});

test('logs in the user and stores their account balance', async () => {
    const userData = {
        _id: 'user-123',
        email: 'peter@example.com',
        accessToken: 'test-token',
    };

    const accountData = {
        openingBalance: 2000,
    };

    const fetchMock = vi.fn()
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(userData),
        })
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([accountData]),
        });

    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
        await result.current.loginHandler({
            email: 'peter@example.com',
            password: 'password123',
        });
    });

    expect(result.current.user).toEqual({
        ...userData,
        balance: 2000,
    });

    expect(result.current.auth).toBe('test-token');
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
        ...userData,
        balance: 2000,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
});

test('rejects login with the server error message', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid email or password.' }),
    });

    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useAuth());

    await expect(
        act(async () => {
            await result.current.loginHandler({
                email: 'peter@example.com',
                password: 'wrong-password',
            });
        })
    ).rejects.toThrow('Invalid email or password.');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('user')).toBeNull();
});

test('rejects login when no account exists for the user', async () => {
    const userData = {
        _id: 'user-123',
        email: 'peter@example.com',
        accessToken: 'test-token',
    };

    const fetchMock = vi.fn()
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(userData),
        })
        .mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve([]),
        });

    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useAuth());

    await expect(
        act(async () => {
            await result.current.loginHandler({
                email: 'peter@example.com',
                password: 'password123',
            });
        })
    ).rejects.toThrow('No account found for this user.');

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem('user')).toBeNull();
});

test('clears the stored session when validation fails', async () => {
    const userData = {
        _id: 'user-123',
        email: 'peter@example.com',
        accessToken: 'expired-token',
        balance: 2000,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    const fetchMock = vi.fn().mockResolvedValueOnce({
        ok: false,
    });

    vi.stubGlobal('fetch', fetchMock);

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

    const { result } = renderHook(() => useAuth());

    await waitFor(() => {
        expect(result.current.user).toEqual({});
        expect(result.current.auth).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3030/users/me',
        expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
                'X-authorization': 'expired-token',
            }),
        })
    );

    consoleSpy.mockRestore();
});

test('rejects logout when the user is already logged out', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useAuth());

    await expect(
        result.current.logoutHandler()
    ).rejects.toThrow('Already logged out.');

    expect(fetchMock).not.toHaveBeenCalled();
});
test('logs out the user and clears the stored session', async () => {
    const userData = {
        _id: 'user-123',
        email: 'peter@example.com',
        accessToken: 'test-token',
        balance: 2000,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    const fetchMock = vi.fn()
        .mockResolvedValueOnce({ ok: true }) // GET /users/me
        .mockResolvedValueOnce({ ok: true }); // GET /users/logout

    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
        await result.current.logoutHandler();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);

    expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3030/users/logout',
        expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
                'X-authorization': 'test-token',
            }),
        })
    );

    expect(result.current.user).toEqual({});
    expect(result.current.auth).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
});