import TransactionsWidget from "../features-widgets/TransactionsWidget";
import SpendingByCategoryWidget from "./SpendingByCategoryWidget";
import OverTimeWidget from "../features-widgets/OverTimeWidget";
import TransactionFormWidget from "../features-widgets/TransactionFormWidget";
import BalanceWidget from "../features-widgets/BalanceWidget";
import ExpenseWidget from "../features-widgets/ExpenseWidget";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import getThreeMonthsTransactionTotals from "../../utils/getThreeMonthsTransactionTotals";

const Expense = () => {
    const { user: { _id } } = useContext(UserContext);
    const urlSearchParamsExpenseTransactions = new URLSearchParams({
        where: `type="expense" AND _ownerId="${_id}"`,
        sortBy: 'date desc'
    });
    const [refreshKey, setRefreshKey] = useState(0);
    const { data: expenses } = useFetch([], `data/transactions?${urlSearchParamsExpenseTransactions}`, null, refreshKey);

    const { monthlyData: spendingData } = getThreeMonthsTransactionTotals(expenses);

    return (
        <div className="flex flex-col w-full">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">Expenses</h1>
                <p className="text-gray-400">Monitor your spending, review purchases, and understand your expenses.</p>
            </div>

            <div className="grid grid-cols-8 auto-rows-37.5 grid-flow-row-dense gap-4">
                <TransactionsWidget title={'Expense transactions'} data={expenses} />
                <SpendingByCategoryWidget refreshKey={refreshKey} />
                <ExpenseWidget size='small' refreshKey={refreshKey} />
                <BalanceWidget size='small' />
                <TransactionFormWidget transactionType={'expense'} onTransactionCreated={setRefreshKey} />

                <OverTimeWidget
                    title={'Spending over three months'}
                    description={'Compare your monthly expenses'}
                    data={spendingData}
                    toolTipLabel={'Spent'}
                />


            </div>

        </div>
    );
};

export default Expense;