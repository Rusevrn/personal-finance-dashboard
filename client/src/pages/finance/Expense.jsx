import ExpenseTransactionsWidget from "../../components/app-components/ExpenseTransactionsWidget";
import SpendingByCategoryWidget from "../../components/app-components/SpendingByCategoryWidget";
import SpendingOverTimeWidget from "../../components/app-components/SpendingOverTimeWidget";
import BalanceWidget from "../../components/app-components/BalanceWidget";
import ExpenseWidget from "../../components/app-components/ExpenseWidget";
import AddExpenseWidget from "../../components/app-components/AddExpenseWidget";

const Expense = () => {

    return (
        <div className="flex flex-col w-full">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">Expenses</h1>
                <p className="text-gray-400">Monitor your spending, review purchases, and understand your expenses.</p>
            </div>

            <div className="grid grid-cols-8 auto-rows-37.5 grid-flow-row-dense gap-4">
                <ExpenseTransactionsWidget />

                <SpendingByCategoryWidget />


                <AddExpenseWidget />
                <SpendingOverTimeWidget />

                <ExpenseWidget size='small' />
                <BalanceWidget size='small' />
            </div>

        </div>
    );
};

export default Expense;