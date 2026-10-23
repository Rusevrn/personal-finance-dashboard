type Transaction = {
    month: string;
    amount: number;
}

export default function getThreeMonthsTransactionTotals(transactions: [Transaction, ...[Transaction]]) {

    const totals = transactions.reduce((acc: Record<string, number>, transaction: Transaction) => {
        const monthKey = transaction.month;

        if (acc[monthKey] === undefined) {
            acc[monthKey] = transaction.amount
        }
        else {
            acc[monthKey] += transaction.amount
        }
        return acc;
    }, {})

    const months = [];

    const today = new Date();

    for (let i = 2; i >= 0; i--) {
        const date = new Date(
            today.getFullYear(),
            today.getMonth() - i,
            1
        );

        const monthKey = `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}`
        months.push(monthKey)
    }

    const monthlyData = months.map(monthKey => {
        const monthDate = new Date(monthKey);
        const monthName = monthDate.toLocaleDateString("en-IE", {
            month: "long",
            timeZone: "UTC"
        });
        return { month: monthName, amount: totals[monthKey] ?? 0 }
    })

    return { monthlyData, totals, today, };
}