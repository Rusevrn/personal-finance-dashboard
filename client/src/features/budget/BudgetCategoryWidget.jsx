import { useContext, useState } from "react";
import DashWidget from "../../components/app-components/widgets/DashWidget";
import { useEffect } from "react";
import UserContext from "../../context/UserContext";
import { calculateBudgets } from "../../utils/calculateBudgets";

const categoryColors = {
    Groceries: "#8B5CF6",
    Housing: "#6366F1",
    Transport: "#06B6D4",
    Entertainment: "#F59E0B",
    Dining: "#F472B6",
};

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
    }).format(value);

const BudgetCategoryWidget = ({ setRemainingBudget }) => {
    const [data, setData] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const { user: { _id } } = useContext(UserContext);

    const urlSearchParamsTransactions = new URLSearchParams({
        where: `month="2026-10" AND type="expense" AND _ownerId="${_id}"`
    });

    useEffect(() => {
        fetch('http://localhost:3030/data/budgets')
            .then(res => res.json())
            .then(result => setData(result));

        fetch(`http://localhost:3030/data/transactions?${urlSearchParamsTransactions}`)
            .then(res => res.json())
            .then(result => setTransactions(result));
    }, [])

    const { budgetsWithSpent, remainingBudget } = calculateBudgets(data, transactions);

    useEffect(() => {
        if (setRemainingBudget) setRemainingBudget(remainingBudget);
    }, [remainingBudget, setRemainingBudget]);

    return (
        <DashWidget size="xl">
            <h2 className="mb-1 text-lg font-semibold text-white">
                Category budgets
            </h2>
            <p className="mb-5 text-sm text-white/45">
                Monthly spending limits
            </p>

            <div className="flex flex-col gap-5">
                {budgetsWithSpent.map((budget) => {
                    const color = categoryColors[budget.category];
                    const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0;
                    const overBudget = percentage > 100;

                    return (
                        <div key={budget.category}>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <span className="text-sm text-white/80">
                                    {budget.category}
                                </span>
                                <span className="text-xs text-white/50">
                                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/8">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                        backgroundColor: overBudget ? "#F87171" : color,
                                    }}
                                />
                            </div>

                            {<p className={`mt-1.5 text-xs ${overBudget ? "text-red-400" : "text-white/35"
                                }`}>
                                {overBudget
                                    ? `${formatCurrency(budget.spent - budget.limit)} over budget`
                                    : `${Math.round(percentage)}% used`}
                            </p>}
                        </div>
                    );
                })}
            </div>
        </DashWidget>
    );
};

export default BudgetCategoryWidget;