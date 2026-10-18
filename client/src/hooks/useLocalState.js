import { useState } from "react";

export default function useLocalState(initialState, key) {
    const [state, setState] = useState(() => {
        const storage = localStorage.getItem(key);

        if (!storage) {
            return initialState;
        };

        const data = JSON.parse(storage);
        return data;
    });

    const setLocalState = (value) => {
        setState(prevState => {
            const input =
                typeof value === 'function'
                    ? value(prevState)
                    : value;

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