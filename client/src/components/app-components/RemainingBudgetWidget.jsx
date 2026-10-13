import DashWidget from "./widgets/DashWidget";

const RemainingBudgetWidget = () => {

    return (
        <DashWidget size="small">
            <p className="text-sm text-white/45">Remaining</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-400">
                €205.31
            </p>
            <p className="mt-1 text-xs text-white/35">Across all budgets</p>
        </DashWidget>
    );
};

export default RemainingBudgetWidget;