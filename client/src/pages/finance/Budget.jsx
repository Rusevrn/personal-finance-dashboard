import AddBudgetWidget from "../../components/app-components/AddBudgetWidget";
import BudgetCategoryWidget from "../../components/app-components/BudgetCategoryWidget";
import BalanceWidget from "../../components/app-components/BalanceWidget";
import RemainingBudgetWidget from "../../components/app-components/RemainingBudgetWidget";

const Budget = () => {

    return (
        <div className="flex flex-col w-full">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">Budgets</h1>
                <p className="text-gray-400">Set spending limits, track your progress, and see how much budget you have left.</p>
            </div>

            <div className="grid grid-cols-6 auto-rows-37.5 grid-flow-row-dense gap-4">

                <AddBudgetWidget />
                <BudgetCategoryWidget />
                <BalanceWidget size='small' />
                <RemainingBudgetWidget />
            </div>

        </div>
    );
};

export default Budget;