import DashWidget from "./widgets/DashWidget";

const budgetData = [
    { category: "Groceries", spent: 245.8, limit: 350, color: "#8B5CF6" },
    { category: "Housing", spent: 180, limit: 250, color: "#6366F1" },
    { category: "Transport", spent: 86.5, limit: 120, color: "#06B6D4" },
    { category: "Entertainment", spent: 64.99, limit: 80, color: "#F59E0B" },
    { category: "Dining", spent: 92.4, limit: 75, color: "#F472B6" },
];

const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
    }).format(value);

const BudgetCategoryWidget = () => {

    return (
        <DashWidget size="xl">
            <h2 className="mb-1 text-lg font-semibold text-white">
                Category budgets
            </h2>
            <p className="mb-5 text-sm text-white/45">
                Monthly spending limits
            </p>

            <div className="flex flex-col gap-5">
                {budgetData.map((budget) => {
                    const percentage = (budget.spent / budget.limit) * 100;
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
                                        backgroundColor: overBudget ? "#F87171" : budget.color,
                                    }}
                                />
                            </div>

                            <p className={`mt-1.5 text-xs ${overBudget ? "text-red-400" : "text-white/35"
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