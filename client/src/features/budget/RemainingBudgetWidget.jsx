import DashWidget from "../../components/app-components/widgets/DashWidget";

const RemainingBudgetWidget = ({ remainder }) => {

    return (
        <DashWidget size="small">
            <div className="flex flex-col items-center h-full justify-between">
                <p className="text-sm text-white/45">Remaining</p>
                <p className="mt-1 text-2xl font-semibold text-emerald-400">
                    €{remainder}
                </p>
                <p className="mt-1 text-xs text-white/35">Across all budgets</p>
            </div>
        </DashWidget>
    );
};

export default RemainingBudgetWidget;