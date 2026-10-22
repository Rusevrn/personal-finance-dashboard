import BalanceWidget from "../../../features/features-widgets/BalanceWidget";
import ExpenseWidget from "../../../features/features-widgets/ExpenseWidget";
import IncomeWidget from "../../../features/features-widgets/IncomeWidget";
import RecentTransactions from "../../../features/features-widgets/RecentTransactions";
import DemoWidget from "../../../features/features-widgets/DemoWidget";
import SpendingByCategoryWidget from '../../../features/expense/SpendingByCategoryWidget';
import TransactionFormWidget from '../../../features/features-widgets/TransactionFormWidget';
import BudgetCategoryWidget from '../../../features/budget/BudgetCategoryWidget';

export const widgetRegistry = {

    recentTransactions: {
        key: 'recentTransactions',
        label: 'Recent transactions',
        description: 'Track your recent transactions.',
        component: RecentTransactions,
        size: 'large',
        section: 'activity',
    },
    spendingByCategoryWidget: {
        key: 'spendingByCategoryWidget',
        label: 'Spending by category',
        description: 'Track your spendings by category.',
        component: SpendingByCategoryWidget,
        size: 'large',
        section: 'overview',
    },
    transactionFormWidget: {
        key: 'transactionFormWidget',
        label: 'Transaction form',
        description: 'Add any type of transaction.',
        component: TransactionFormWidget,
        size: 'large',
        section: 'activity',
    },
    budgetCategoryWidget: {
        key: 'budgetCategoryWidget',
        label: 'Budget category',
        description: 'Track your allowed budgets.',
        component: BudgetCategoryWidget,
        size: 'wide',
        section: 'overview',
    },
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
    demoWidget: {
        key: 'DemoWidget',
        label: 'Line chart',
        description: 'Test the "Weight limit" of the overview section :)',
        component: DemoWidget,
        size: 'large',
        section: 'overview',
    },


};
