import { useEffect } from "react";
import useLocalState from "./useLocalState";

export default function useAuth() {
    const { state: user, setLocalState: setUser, clearLocalStorage: clearUser } = useLocalState({}, 'user');

    const loginHandler = async (values) => {
        if (user.accessToken) {
            throw new Error('Already logged in.');
        }

        const userResponse = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
            throw new Error(userData.message || 'Login failed.');
        };

        const urlSearchParamsAccount = new URLSearchParams({
            where: `_ownerId="${userData._id}"`
        });

        const accountResponse = await fetch(`http://localhost:3030/data/accounts?${urlSearchParamsAccount}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });

        if (!accountResponse.ok) {
            throw new Error('Failed to fetch account.');
        };

        const [accountData] = await accountResponse.json();

        if (!accountData) {
            throw new Error('No account found for this user.');
        };

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

    return { user, loginHandler, logoutHandler, auth: user.accessToken ?? null };
}