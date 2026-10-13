import DashWidget from "./widgets/DashWidget";
import { FiPlus } from "react-icons/fi";

const AddBudgetWidget = () => {

    return (
        <DashWidget size="large">
            <h2 className="mb-1 text-lg font-semibold text-white">
                Add Budget
            </h2>
            <p className="mb-5 text-sm text-white/45">
                Set a spending limit for a category
            </p>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget-category" className="text-sm text-white/65">Category</label>
                    <select
                        id="budget-category"
                        name="category"
                        defaultValue=""
                        className="rounded-xl border border-white/10 bg-[#252630] px-3 py-2.5 text-sm text-white/70 outline-none focus:border-violet-500"
                    >
                        <option value="" disabled>Select category</option>
                        <option>Groceries</option>
                        <option>Housing</option>
                        <option>Transport</option>
                        <option>Entertainment</option>
                        <option>Dining</option>
                        <option>Subscriptions</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget-limit" className="text-sm text-white/65">Monthly limit (€)</label>
                    <input
                        id="budget-limit"
                        name="limit"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="e.g. 250.00"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-violet-500"
                    />
                </div>

                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
                >
                    <FiPlus size={16} />
                    Add Budget
                </button>
            </form>
        </DashWidget>
    );
};

export default AddBudgetWidget;