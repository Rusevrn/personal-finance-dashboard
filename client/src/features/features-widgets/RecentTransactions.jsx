import DashWidget from "../../components/app-components/widgets/DashWidget";
import TransactionItem from "../../components/app-components/TransactionItem";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";

const RecentTransactions = ({ size, refreshKey }) => {
    const { user: { _id } } = useContext(UserContext);
    const urlSearchParamsExpenseTransactions = new URLSearchParams({
        where: `_ownerId="${_id}"`,
        sortBy: 'date desc, _createdOn desc',
        offset: 0,
        pageSize: 5
    });
    const { data: transactions } = useFetch([], `data/transactions?${urlSearchParamsExpenseTransactions}`, null, refreshKey);
    
    return (
        <DashWidget size={size}>
            <h2 className="text-lg font-semibold text-white">
                Recent transactions
            </h2>
            {transactions.map(transaction => (
                <TransactionItem
                    key={transaction._id}
                    merchant={transaction.merchant}
                    category={transaction.category}
                    date={transaction.date}
                    type={transaction.type}
                    amount={transaction.amount}
                />
            ))}
        </DashWidget>
    );
};

export default RecentTransactions;