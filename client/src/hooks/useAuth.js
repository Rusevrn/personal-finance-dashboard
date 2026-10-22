import { useEffect } from "react";
import useLocalState from "./useLocalState";
import useFetch from "./useFetch";
import { useState } from "react";

export default function useAuth() {
    const { state: user, setLocalState: setUser, clearLocalStorage: clearUser } = useLocalState({}, 'user');
    const { request } = useFetch();
    const [isCheckingSession, setIsCheckingSession] = useState(() => {
        return user.accessToken ? true : false
    });

    const updateBalance = async (amount, type) => {
        const urlSearchParamsAccount = new URLSearchParams({
            where: `_ownerId="${user._id}"`
        });

        const accounts = await request(`data/accounts?${urlSearchParamsAccount}`);
        const [account] = accounts;

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


    const createAccount = async (userData, values) => {
        const response = await request(`data/accounts`,
            {
                method: 'POST',
                payload: {
                    currentBalance: Number(values.currentBalance)
                },
                auth: userData.accessToken
            }
        );

        return response;
    }

    const getAccount = async (userData) => {
        const urlSearchParamsAccount = new URLSearchParams({
            where: `_ownerId="${userData._id}"`
        });

        const response = await request(`data/accounts?${urlSearchParamsAccount}`);

        const [accountData] = response;

        return accountData;
    }

    const loginHandler = async (action, values) => {
        if (user.accessToken) {
            throw new Error('Already logged in.');
        }

        const response = await request(`users/${action}`, { method: 'POST', payload: { email: values.email, password: values.password } })
        const userData = response;

        const accountData = action === 'login' ? await getAccount(userData) : await createAccount(userData, values)

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
        } catch (error) {
            console.log(error.message)
        } finally {
            clearUser();
        }
    };

    useEffect(() => {
        if (!user.accessToken) return;

        const isLoggedIn = async () => {
            try {
                await request('users/me', { auth: user.accessToken });

            } catch (error) {
                clearUser();
                console.log(error.message)
            } finally {
                setIsCheckingSession(false);
            }
        };
        isLoggedIn();

    }, [])

    return { user, loginHandler, logoutHandler, auth: user.accessToken ?? null, updateBalance, isCheckingSession };
}