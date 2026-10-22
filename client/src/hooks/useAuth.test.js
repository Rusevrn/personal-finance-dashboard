
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useAuth from './useAuth';
import useLocalState from './useLocalState';
import useFetch from './useFetch';

vi.mock('./useLocalState', () => ({
    default: vi.fn()
}));

vi.mock('./useFetch', () => ({
    default: vi.fn()
}));

describe('useAuth', () => {
    let user;
    let setUser;
    let clearUser;
    let request;

    beforeEach(() => {
        vi.clearAllMocks();

        user = {};
        setUser = vi.fn(updater => {
            user = typeof updater === 'function' ? updater(user) : updater;
        });
        clearUser = vi.fn(() => {
            user = {};
        });
        request = vi.fn();

        useLocalState.mockImplementation(() => ({
            state: user,
            setLocalState: setUser,
            clearLocalStorage: clearUser
        }));

        useFetch.mockReturnValue({ request });
    });

    it('returns the user, auth token, and handlers', () => {
        const { result } = renderHook(() => useAuth());

        expect(result.current.user).toEqual({});
        expect(result.current.auth).toBeNull();
        expect(result.current.loginHandler).toBeTypeOf('function');
        expect(result.current.logoutHandler).toBeTypeOf('function');
        expect(result.current.balanceUpdate).toBeTypeOf('function');
    });

    it('logs in and stores user data with the existing account balance', async () => {
        const userData = {
            _id: 'user-1',
            accessToken: 'token-1',
            email: 'test@example.com'
        };

        request
            .mockResolvedValueOnce(userData)
            .mockResolvedValueOnce([{ _id: 'account-1', currentBalance: 2000 }]);

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.loginHandler('login', {
                email: 'test@example.com',
                password: 'password123'
            });
        });

        expect(request).toHaveBeenNthCalledWith(1, 'users/login', {
            method: 'POST',
            payload: {
                email: 'test@example.com',
                password: 'password123'
            }
        });

        expect(request).toHaveBeenNthCalledWith(
            2,
            expect.stringMatching(/^data\/accounts\?where=/)
        );

        expect(setUser).toHaveBeenCalledWith({
            ...userData,
            balance: 2000
        });
    });

    it('registers a user, creates an account, and stores the opening balance', async () => {
        const userData = {
            _id: 'user-2',
            accessToken: 'token-2',
            email: 'new@example.com'
        };

        request
            .mockResolvedValueOnce(userData)
            .mockResolvedValueOnce({ _id: 'account-2', currentBalance: 500 });

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.loginHandler('register', {
                email: 'new@example.com',
                password: 'password123',
                currentBalance: '500'
            });
        });

        expect(request).toHaveBeenNthCalledWith(1, 'users/register', {
            method: 'POST',
            payload: {
                email: 'new@example.com',
                password: 'password123'
            }
        });

        expect(request).toHaveBeenNthCalledWith(2, 'data/accounts', {
            method: 'POST',
            payload: { currentBalance: 500 },
            auth: 'token-2'
        });

        expect(setUser).toHaveBeenCalledWith({
            ...userData,
            balance: 500
        });
    });

    it('rejects login when already authenticated', async () => {
        user = { _id: 'user-1', accessToken: 'token-1' };
        useLocalState.mockImplementation(() => ({
            state: user,
            setLocalState: setUser,
            clearLocalStorage: clearUser
        }));

        const { result } = renderHook(() => useAuth());

        await expect(
            result.current.loginHandler('login', {
                email: 'test@example.com',
                password: 'password123'
            })
        ).rejects.toThrow('Already logged in.');

        expect(request).not.toHaveBeenCalled();
        expect(setUser).not.toHaveBeenCalled();
    });

    it('does not store a user if login fails', async () => {
        request.mockRejectedValueOnce(new Error('Invalid credentials'));

        const { result } = renderHook(() => useAuth());

        await expect(
            result.current.loginHandler('login', {
                email: 'test@example.com',
                password: 'wrong-password'
            })
        ).rejects.toThrow('Invalid credentials');

        expect(setUser).not.toHaveBeenCalled();
    });

    it('adds income to the account balance and local user state', async () => {
        user = { _id: 'user-1', accessToken: 'token-1', balance: 2000 };
        useLocalState.mockImplementation(() => ({
            state: user,
            setLocalState: setUser,
            clearLocalStorage: clearUser
        }));

        request
            .mockResolvedValueOnce([{ _id: 'account-1', currentBalance: 2000 }])
            .mockResolvedValueOnce({});

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.balanceUpdate('250.50', 'income');
        });

        expect(request).toHaveBeenNthCalledWith(
            2,
            'data/accounts/account-1',
            {
                method: 'PATCH',
                payload: { currentBalance: 2250.5 },
                auth: 'token-1'
            }
        );

        expect(setUser).toHaveBeenCalledWith(expect.any(Function));
        expect(user.balance).toBe(2250.5);
    });

    it('subtracts expenses from the account balance and local user state', async () => {
        user = { _id: 'user-1', accessToken: 'token-1', balance: 2000 };
        useLocalState.mockImplementation(() => ({
            state: user,
            setLocalState: setUser,
            clearLocalStorage: clearUser
        }));

        request
            .mockResolvedValueOnce([{ _id: 'account-1', currentBalance: 2000 }])
            .mockResolvedValueOnce({});

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.balanceUpdate(75, 'expense');
        });

        expect(request).toHaveBeenNthCalledWith(
            2,
            'data/accounts/account-1',
            {
                method: 'PATCH',
                payload: { currentBalance: 1925 },
                auth: 'token-1'
            }
        );

        expect(user.balance).toBe(1925);
    });

    it('does not update local balance if the account PATCH fails', async () => {
        user = { _id: 'user-1', accessToken: 'token-1', balance: 2000 };
        useLocalState.mockImplementation(() => ({
            state: user,
            setLocalState: setUser,
            clearLocalStorage: clearUser
        }));

        request
            .mockResolvedValueOnce([{ _id: 'account-1', currentBalance: 2000 }])
            .mockRejectedValueOnce(new Error('PATCH failed'));

        const { result } = renderHook(() => useAuth());

        await expect(
            result.current.balanceUpdate(100, 'expense')
        ).rejects.toThrow('PATCH failed');

        expect(setUser).not.toHaveBeenCalled();
        expect(user.balance).toBe(2000);
    });

    it('rejects logout when already logged out', async () => {
        const { result } = renderHook(() => useAuth());

        await expect(result.current.logoutHandler())
            .rejects.toThrow('Already logged out.');

        expect(clearUser).not.toHaveBeenCalled();
    });

    it('sends the token and clears the user after a successful logout', async () => {
        user = { _id: 'user-1', accessToken: 'token-1', balance: 2000 };
        useLocalState.mockImplementation(() => ({
            state: user,
            setLocalState: setUser,
            clearLocalStorage: clearUser
        }));

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true
        }));

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.logoutHandler();
        });

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3030/users/logout',
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({
                    'X-authorization': 'token-1'
                })
            })
        );

        expect(clearUser).toHaveBeenCalledOnce();
    });

    it('clears the user when session validation fails', async () => {
        user = { _id: 'user-1', accessToken: 'expired-token' };
        useLocalState.mockImplementation(() => ({
            state: user,
            setLocalState: setUser,
            clearLocalStorage: clearUser
        }));

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false
        }));

        renderHook(() => useAuth());

        await waitFor(() => {
            expect(clearUser).toHaveBeenCalledOnce();
        });

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3030/users/me',
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({
                    'X-authorization': 'expired-token'
                })
            })
        );
    });
});