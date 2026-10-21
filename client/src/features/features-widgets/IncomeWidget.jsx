import { useContext, useEffect, useState } from "react";
import DashWidget from "../../components/app-components/widgets/DashWidget";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";

const IncomeWidget = ({ size, refreshKey }) => {
    const { user: { _id } } = useContext(UserContext);
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    const urlSearchParamsExpenseTransactions = new URLSearchParams({
        where: `type="income" AND _ownerId="${_id}" AND month="${currentMonth}"`
    });
    const { data: transactions } = useFetch([], `data/transactions?${urlSearchParamsExpenseTransactions}`, null, refreshKey);

    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <DashWidget size={size} type='income'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Income /m</p>

                <p className="text-2xl font-semibold text-emerald-400">
                    +€{total}
                </p>
            </div>
        </DashWidget>

    );
};

export default IncomeWidget;