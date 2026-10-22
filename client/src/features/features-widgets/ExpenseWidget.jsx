import DashWidget from "../../components/app-components/widgets/DashWidget";
import useMonthlyTransactions from "../../hooks/useMonthlyTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

const ExpenseWidget = ({ size, refreshKey }) => {
    const { transactions } = useMonthlyTransactions('expense', refreshKey);

    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <DashWidget size={size} type='expense'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Expenses /m</p>

                <p className="text-2xl font-semibold text-red-400">
                    -{formatCurrency(total)}
                </p>
            </div>
        </DashWidget>
    );
};

export default ExpenseWidget;