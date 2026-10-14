import TransactionsWidget from "../features-widgets/TransactionsWidget";
import SpendingByCategoryWidget from "./SpendingByCategoryWidget";
import OverTimeWidget from "../features-widgets/OverTimeWidget";
import TransactionFormWidget from "../features-widgets/TransactionFormWidget";
import BalanceWidget from "../features-widgets/BalanceWidget";
import ExpenseWidget from "../features-widgets/ExpenseWidget";

const spendingData = [
    { month: "August", amount: 1240.5 },
    { month: "September", amount: 1085.75 },
    { month: "October", amount: 1320.2 },
];

const expenses = [
    { id: 1, merchant: "Kaufland", category: "Groceries", date: "Oct 12", amount: -42.80 },
    { id: 2, merchant: "Netflix", category: "Entertainment", date: "Oct 11", amount: -15.99 },
    { id: 3, merchant: "Googlepay", category: "Entertainment", date: "Oct 10", amount: -32.50 },
    { id: 4, merchant: "Spotify", category: "Entertainment", date: "Oct 9", amount: -10.99 },
    { id: 5, merchant: "Lidl", category: "Groceries", date: "Oct 8", amount: -24.60 },
    { id: 6, merchant: "Googlepay", category: "Entertainment", date: "Oct 10", amount: -32.50 },
    { id: 7, merchant: "Spotify", category: "Entertainment", date: "Oct 9", amount: -10.99 },
    { id: 8, merchant: "Lidl", category: "Groceries", date: "Oct 8", amount: -24.60 },
];

const Expense = () => {

    return (
        <div className="flex flex-col w-full">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">Expenses</h1>
                <p className="text-gray-400">Monitor your spending, review purchases, and understand your expenses.</p>
            </div>

            <div className="grid grid-cols-8 auto-rows-37.5 grid-flow-row-dense gap-4">
                <TransactionsWidget title={'Expense transactions'} data={expenses} />
                <SpendingByCategoryWidget />
                <ExpenseWidget size='small' />
                <BalanceWidget size='small' />
                <TransactionFormWidget transactionType={'Expense'} />
                
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