import { useContext } from "react";
import UserContext from "../context/UserContext";
import useFetch from "./useFetch";

export default function useMonthlyTransactions(type: 'income' | 'expense', refreshKey: number) {
    const { user: { _id } } = useContext(UserContext);
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

    const urlSearchParamsTransactions = new URLSearchParams({
        where: `month="${currentMonth}" AND type="${type}" AND _ownerId="${_id}"`
    });

    const { data: transactions } = useFetch([], `data/transactions?${urlSearchParamsTransactions}`, null, refreshKey);

    return { transactions };
}