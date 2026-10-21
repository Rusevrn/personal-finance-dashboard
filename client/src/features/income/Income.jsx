import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import IncomeWidget from "../features-widgets/IncomeWidget";
import OverTimeWidget from "../features-widgets/OverTimeWidget";
import TransactionFormWidget from "../features-widgets/TransactionFormWidget";
import TransactionsWidget from "../features-widgets/TransactionsWidget";
import useFetch from "../../hooks/useFetch";
import getThreeMonthsTransactionTotals from "../../utils/getThreeMonthsTransactionTotals";

const Income = () => {
    const { user: { _id } } = useContext(UserContext);
    const urlSearchParamsExpenseTransactions = new URLSearchParams({
        where: `type="income" AND _ownerId="${_id}"`,
        sortBy: 'date desc'
    });
    const [refreshKey, setRefreshKey] = useState();
    const { data: income } = useFetch([], `data/transactions?${urlSearchParamsExpenseTransactions}`, refreshKey);
    const { monthlyData: incomeData } = getThreeMonthsTransactionTotals(income);

    return (
        <div className="flex flex-col w-full">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">Income</h1>
                <p className="text-gray-400">Track your earnings and see where your money comes from.</p>
            </div>

            <div className="grid grid-cols-6 auto-rows-37.5 grid-flow-row-dense gap-4">
                <TransactionsWidget title={'Income transactions'} data={income} />
                <OverTimeWidget
                    title={'Income over three months'}
                    description={'Compare your monthly earnings'}
                    data={incomeData}
                    toolTipLabel={'Earned'}
                />
                <IncomeWidget size={'small'} refreshKey={refreshKey} />
                <TransactionFormWidget transactionType={'income'} onTransactionCreated={setRefreshKey} />
            </div>

        </div>
    );
};

export default Income;