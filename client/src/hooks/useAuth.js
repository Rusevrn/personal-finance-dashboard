import { useEffect } from "react";
import useLocalState from "./useLocalState";
import useFetch from "./useFetch";

export default function useAuth() {
    const { state: user, setLocalState: setUser, clearLocalStorage: clearUser } = useLocalState({}, 'user');
    const { request } = useFetch();

    const balanceUpdate = async (amount, type) => {
        const urlSearchParamsAccount = new URLSearchParams({
            where: `_ownerId="${user._id}"`
        });

        const accounts = await request(`data/accounts?${urlSearchParamsAccount}`);
        const [account] = accounts;

        const currentBalance = Number(account.openingBalance);
        const transactionAmount = Number(amount);

        const newBalance = type === 'income'
            ? currentBalance + transactionAmount
            : currentBalance - transactionAmount;

        await request(`data/accounts/${account._id}`, {
            method: 'PATCH',
            payload: { openingBalance: newBalance },
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
                    openingBalance: Number(values.openingBalance)
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
            balance: accountData.openingBalance
        });
    };

    const logoutHandler = async () => {
        if (!user.accessToken) {
            throw new Error('Already logged out.')
        }

        await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'X-authorization': user.accessToken
            }
        });

        clearUser();
    };

    useEffect(() => {
        if (!user.accessToken) return;

        const isLoggedIn = async () => {
            try {
                const response = await fetch('http://localhost:3030/users/me', {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'X-authorization': user.accessToken
                    }
                });

                if (!response.ok) {
                    throw new Error('Session validation failed.');
                }
            } catch (error) {
                clearUser();
                console.log(error.message)
            };
        };
        isLoggedIn();

    }, [])

    return { user, loginHandler, logoutHandler, auth: user.accessToken ?? null, balanceUpdate };
}