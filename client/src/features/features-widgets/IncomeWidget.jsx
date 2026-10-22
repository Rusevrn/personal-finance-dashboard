import DashWidget from "../../components/app-components/widgets/DashWidget";
import useMonthlyTransactions from "../../hooks/useMonthlyTransactions";
import { formatCurrency } from "../../utils/formatCurrency";

const IncomeWidget = ({ size, refreshKey }) => {
    const { transactions } = useMonthlyTransactions('income', refreshKey)

    const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <DashWidget size={size} type='income'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Income /m</p>

                <p className="text-2xl font-semibold text-emerald-400">
                    +{formatCurrency(total)}
                </p>
            </div>
        </DashWidget>
    );
};

export default IncomeWidget;