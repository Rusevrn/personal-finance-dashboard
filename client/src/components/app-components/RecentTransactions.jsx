import DashWidget from "./widgets/DashWidget";
import TransactionItem from "./TransactionItem";

const RecentTransactions = ({ size }) => {

    return (
        <DashWidget size={size}>
            <h2 className="text-lg font-semibold text-white">
                Recent transactions
            </h2>
            <TransactionItem merchant={'Netflix'} date={'Today'} amount={-15} type={'expense'} />
            <TransactionItem merchant={'Spotify'} date={'Yesterday'} amount={-10} type={'expense'} />
            <TransactionItem merchant={'Salary'} date={'Sep 30'} amount={2950} type={'income'} />
            <TransactionItem merchant={'Googlepay'} date={'Sep 30'} amount={-42.50} type={'expense'} />
            <TransactionItem merchant={'Kaufland'} date={'Sep 28'} amount={-67.30} type={'expense'} />
        </DashWidget>
    );
};

export default RecentTransactions;