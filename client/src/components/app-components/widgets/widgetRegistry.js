import BalanceWidget from "../BalanceWidget";
import ExpenseWidget from "../ExpenseWidget";
import IncomeWidget from "../IncomeWidget";
import RecentTransactions from "../RecentTransactions";
import LineChartWidget from "../LineChartWidget";
import SpendingByCategoryWidget from '../SpendingByCategoryWidget';
import ExpenseTransactionsWidget from '../ExpenseTransactionsWidget';
import SpendingOverTimeWidget from '../SpendingOverTimeWidget';

export const widgetRegistry = {

    balanceWidget: {
        key: 'balanceWidget',
        label: 'Balance',
        description: 'Your current financial position.',
        component: BalanceWidget,
        size: 'small',
        section: 'overview',
    },
    incomeWidget: {
        key: 'incomeWidget',
        label: 'Income',
        description: 'Track the money coming in.',
        component: IncomeWidget,
        size: 'small',
        section: 'overview',
    },
    expenseWidget: {
        key: 'expenseWidget',
        label: 'Expenses',
        description: 'Track the money going out.',
        component: ExpenseWidget,
        size: 'small',
        section: 'overview',
    },
    lineChartWidget: {
        key: 'lineChartWidget',
        label: 'Line chart',
        description: 'Track your spending over time.',
        component: LineChartWidget,
        size: 'large',
        section: 'overview',
    },
    recentTransactions: {
        key: 'recentTransactions',
        label: 'Recent transactions',
        description: 'Track your recent transactions.',
        component: RecentTransactions,
        size: 'large',
        section: 'activity',
    },
    /*spendingByCategoryWidget: {
        key: 'spendingByCategoryWidget',
        label: 'Spending by category',
        description: 'Track your spendings by category.',
        component: SpendingByCategoryWidget,
        size: 'large',
        section: 'expenses',
    },
    expenseTransactionsWidget: {
        key: 'expenseTransactionsWidget',
        label: 'Expense transactions',
        description: 'Track your expense transactions.',
        component: ExpenseTransactionsWidget,
        size: 'long',
        section: 'expenses',
    },
    spendingOverTimeWidget: {
        key: 'spendingOverTimeWidget',
        label: 'Spendings over time',
        description: 'Track your spendings over time.',
        component: SpendingOverTimeWidget,
        size: 'widest',
        section: 'expenses',
    },

*/
};
