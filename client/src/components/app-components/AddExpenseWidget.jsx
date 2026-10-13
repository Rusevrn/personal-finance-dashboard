import DashWidget from "./widgets/DashWidget";
import { FiPlus } from "react-icons/fi";

const AddExpenseWidget = () => {
    return (
        <DashWidget size="xl">
            <h2 className="mb-1 text-lg font-semibold text-white">
                Add Expense
            </h2>
            <p className="mb-5 text-sm text-white/45">
                Record a new transaction
            </p>

            <form className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="expense-merchant" className="text-sm text-white/65">Merchant</label>
                    <input
                        id="expense-merchant"
                        name="merchant"
                        type="text"
                        placeholder="e.g. Kaufland"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="expense-amount" className="text-sm text-white/65">Amount (€)</label>
                    <input
                        id="expense-amount"
                        name="amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="expense-category" className="text-sm text-white/65">Category</label>
                    <select
                        id="expense-category"
                        name="category"
                        defaultValue=""
                        className="rounded-xl border border-white/10 bg-[#252630] px-3 py-2.5 text-sm text-white/70 outline-none transition focus:border-violet-500"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        <option value="Groceries">Groceries</option>
                        <option value="Housing">Housing</option>
                        <option value="Transport">Transport</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Dining">Dining</option>
                        <option value="Subscriptions">Subscriptions</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="expense-date" className="text-sm text-white/65">Date</label>
                    <input
                        id="expense-date"
                        name="date"
                        type="date"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white/70 outline-none transition focus:border-violet-500"
                    />
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="expense-description" className="text-sm text-white/65">Description</label>
                    <input
                        id="expense-description"
                        name="description"
                        type="text"
                        placeholder="What was this expense for?"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                    />
                </div>

                <div className="sm:col-span-2">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
                        type="button"
                    ><FiPlus size={16} />Add Expense</button>
                </div>
            </form>
        </DashWidget>
    );
};

export default AddExpenseWidget;
