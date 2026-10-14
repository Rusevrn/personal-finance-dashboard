import DashWidget from "../../components/app-components/widgets/DashWidget";
import { useParams } from "react-router";
import { FiPlus } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { useState } from "react";

const TransactionFormWidget = ({ transactionType }) => {
    const { section } = useParams();
    const [action, setAction] = useState(
        section ? transactionType : 'Income'
    );

    const toggleAction = () => {
        setAction(currentAction =>
            currentAction === 'Income' ? 'Expense' : 'Income'
        );
    };

    return (
        <DashWidget size="large">
            <div className="flex justify-between">
                <div>
                    <h2 className="mb-1 text-lg font-semibold text-white">
                        {action === 'Income' ? 'Add income' : 'Add Expense'}
                    </h2>
                    <p className="mb-5 text-sm text-white/45">
                        Record a new transaction
                    </p>
                </div>

                {!section &&
                    <button className="flex rounded-xl h-fit border items-center border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-white/6 hover:text-white"
                        onClick={toggleAction}>
                        Add<GrTransaction className="text-sm text-violet-400 ml-1.5" />
                    </button>
                }

            </div>

            <form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${action}-merchant`} className="text-sm text-white/65">Merchant</label>
                    <input
                        id={`${action}-merchant`}
                        name="merchant"
                        type="text"
                        placeholder="e.g. Kaufland"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${action}-amount`} className="text-sm text-white/65">Amount (€)</label>
                    <input
                        id={`${action}-amount`}
                        name="amount"
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${action}-category`} className="text-sm text-white/65">Category</label>
                    <select
                        id={`${action}-category`}
                        name="category"
                        defaultValue=""
                        className="rounded-xl border border-white/10 bg-[#252630] px-3 py-2.5 text-sm text-white/70 outline-none transition focus:border-violet-500"
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        {action === 'Income'
                            ? <>
                                <option value="Salary">Salary</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Investments">Investments</option>
                                <option value="Refund">Refund</option>
                            </>

                            : <>
                                <option value="Groceries">Groceries</option>
                                <option value="Housing">Housing</option>
                                <option value="Transport">Transport</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Dining">Dining</option>
                                <option value="Subscriptions">Subscriptions</option>
                            </>
                        }
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${action}-date`} className="text-sm text-white/65">Date</label>
                    <input
                        id={`${action}-date`}
                        name="date"
                        type="date"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white/70 outline-none transition focus:border-violet-500"
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

export default TransactionFormWidget;
