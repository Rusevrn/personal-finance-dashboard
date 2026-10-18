
export const calculateBudgets = (budgets, transactions) => {
    const budgetsWithSpent = budgets.map((budget) => {

        const spent = transactions.filter((transaction) => transaction.category === budget.category)
            .reduce((total, transaction) => total + transaction.amount, 0);

        return { ...budget, spent };
    });
    const remainingBudget = budgetsWithSpent.reduce((total, budget) => total + budget.limit - budget.spent, 0);

    return { budgetsWithSpent, remainingBudget }
}