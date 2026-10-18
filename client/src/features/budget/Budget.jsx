import AddBudgetWidget from "./AddBudgetWidget";
import BudgetCategoryWidget from "./BudgetCategoryWidget";
import BalanceWidget from "../features-widgets/BalanceWidget";
import RemainingBudgetWidget from "./RemainingBudgetWidget";
import { useState } from "react";

const Budget = () => {
    const [remainingBudget, setRemainingBudget] = useState();
    
    return (
        <div className="flex flex-col w-full">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">Budgets</h1>
                <p className="text-gray-400">Set spending limits, track your progress, and see how much budget you have left.</p>
            </div>

            <div className="grid grid-cols-6 auto-rows-37.5 grid-flow-row-dense gap-4">

                <AddBudgetWidget />
                <BudgetCategoryWidget setRemainingBudget={setRemainingBudget} />
                <BalanceWidget size='small' />
                <RemainingBudgetWidget remainder={remainingBudget} />
            </div>

        </div>
    );
};

export default Budget;