import BalanceWidget from "../BalanceWidget";
import ExpenseWidget from "../ExpenseWidget";
import IncomeWidget from "../IncomeWidget";
import RecentTransactions from "../RecentTransactions";
import LineChartWidget from "../LineChartWidget";

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


};
