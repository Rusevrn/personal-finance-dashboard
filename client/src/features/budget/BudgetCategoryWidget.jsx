import { useContext } from "react";
import DashWidget from "../../components/app-components/widgets/DashWidget";
import { useEffect } from "react";
import UserContext from "../../context/UserContext";
import { calculateBudgets } from "../../utils/calculateBudgets";
import useFetch from "../../hooks/useFetch";
import useMonthlyTransactions from "../../hooks/useMonthlyTransactions";
import { categoryColors } from "../../utils/categoryColors";
import { formatCurrency } from "../../utils/formatCurrency";

const BudgetCategoryWidget = ({ setRemainingBudget, setBudgets, refreshKey }) => {
    const { user: { _id } } = useContext(UserContext);
    const urlSearchParamsBudgets = new URLSearchParams({
        where: `_ownerId="${_id}"`
    });
    const { data: budgets } = useFetch([], `data/budgets?${urlSearchParamsBudgets}`, null, refreshKey);
    const { transactions } = useMonthlyTransactions('expense', refreshKey);

    const { budgetsWithSpent, remainingBudget } = calculateBudgets(budgets, transactions);

    useEffect(() => {
        if (setBudgets) {
            setBudgets(budgets)
        }
        if (setRemainingBudget) setRemainingBudget(remainingBudget);
    }, [remainingBudget, setRemainingBudget, budgets]);

    return (
        <DashWidget size="wide">
            <h2 className="mb-1 text-lg font-semibold text-white">
                Category budgets
            </h2>
            <p className="mb-5 text-sm text-white/45">
                Monthly spending limits
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 @md:grid-cols-2 @2xl:grid-cols-3">
                {budgetsWithSpent.map((budget) => {
                    const color = categoryColors[budget.category];
                    const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
                    const overBudget = percentage > 100;

                    return (
                        <div key={budget.category}>
                            <div className="mb-1.5 flex min-w-0 items-center justify-between gap-2">
                                <span className="min-w-0 truncate text-sm text-white/80 @md:text-sm">
                                    {budget.category}
                                </span>
                                <span className="shrink-0 whitespace-nowrap text-[11px] text-white/50 @md:text-sm">
                                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                                </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                                <div
                                    className="h-full rounded-full transition-[width] duration-300"
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                        backgroundColor: overBudget ? "#F87171" : color,
                                    }}
                                />
                            </div>

                            <p className={`mt-1 text-[11px] @md:text-xs ${overBudget ? "text-red-400" : "text-white/35"
                                }`}>
                                {overBudget
                                    ? `${formatCurrency(budget.spent - budget.limit)} over budget`
                                    : `${Math.round(percentage)}% used`}
                            </p>
                        </div>
                    );
                })}
            </div>
        </DashWidget>
    );
};

export default BudgetCategoryWidget;