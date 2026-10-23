import { useEffect } from "react";
import useLocalState from "./useLocalState";
import useFetch from "./useFetch";
import { useState } from "react";

type User = {
    _id?: string;
    email?: string;
    accessToken?: string;
    balance?: number;
};

type Account = {
    _id: string;
    _ownerId: string;
    currentBalance: number;
};

export default function useAuth() {
    const { state: user, setLocalState: setUser, clearLocalStorage: clearUser } = useLocalState<User>({}, 'user');
    const { request } = useFetch<unknown>(null, '', null, 0);
    const [isCheckingSession, setIsCheckingSession] = useState(() => {
        return user.accessToken ? true : false
    });

    const updateBalance = async (amount: string | number, type: 'income' | 'expense') => {
        const urlSearchParamsAccount = new URLSearchParams({
            where: `_ownerId="${user._id}"`
        });

        const accounts = await request(`data/accounts?${urlSearchParamsAccount}`) as Account[];
        const [account] = accounts;

        if (!account) {
            throw new Error('Account not found.');
        }

        const currentBalance = Number(account.currentBalance);
        const transactionAmount = Number(amount);

        const newBalance = type === 'income'
            ? currentBalance + transactionAmount
            : currentBalance - transactionAmount;

        await request(`data/accounts/${account._id}`, {
            method: 'PATCH',
            payload: { currentBalance: newBalance },
            auth: user.accessToken
        });

        setUser(previousUser => ({
            ...previousUser,
            balance: newBalance
        }));
    };


    const createAccount = async (userData: User, values: { email: string, password: string, currentBalance: number }): Promise<Account> => {
        const response = await request(`data/accounts`,
            {
                method: 'POST',
                payload: {
                    currentBalance: Number(values.currentBalance)
                },
                auth: userData.accessToken
            }
        ) as Account;

        return response;
    }

    const getAccount = async (userData: User) => {
        const urlSearchParamsAccount = new URLSearchParams({
            where: `_ownerId="${userData._id}"`
        });

        const response = await request(`data/accounts?${urlSearchParamsAccount}`) as Account[];

        const [accountData] = response;

        if (!accountData) {
            throw new Error('Account not found.');
        }

        return accountData;
    }

    const loginHandler = async (action: 'login' | 'register', values: { email: string, password: string, currentBalance: number }) => {
        if (user.accessToken) {
            throw new Error('Already logged in.');
        }

        const response = await request(`users/${action}`, { method: 'POST', payload: { email: values.email, password: values.password } }) as User;
        const userData = response;

        const accountData = action === 'login' ? await getAccount(userData) : await createAccount(userData, values);

        setUser({
            ...userData,
            balance: accountData.currentBalance
        });
    };

    const logoutHandler = async () => {
        if (!user.accessToken) {
            throw new Error('Already logged out.')
        }
        try {
            await request('users/logout', { auth: user.accessToken });
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : error)
        } finally {
            clearUser();
        }
    };

    useEffect(() => {
        if (!user.accessToken) return;

        const isLoggedIn = async () => {
            try {
                await request('users/me', { auth: user.accessToken });

            } catch (error: unknown) {
                clearUser();
                console.log(error instanceof Error ? error.message : error)
            } finally {
                setIsCheckingSession(false);
            }
        };
        isLoggedIn();

    }, [])

    return { user, loginHandler, logoutHandler, auth: user.accessToken ?? null, updateBalance, isCheckingSession };
}