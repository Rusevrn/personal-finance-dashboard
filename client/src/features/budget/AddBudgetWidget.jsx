import DashWidget from "../../components/app-components/widgets/DashWidget";
import { FiPlus } from "react-icons/fi";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";

const requiredFields = ['category', 'limit'];

const AddBudgetWidget = ({ budgets, onBudgetCreated }) => {
    const { user: { accessToken } } = useContext(UserContext);
    const { request } = useFetch();

    const onBudgetSubmit = async () => {
        try {
            if (!budgets.some(budget => budget.category === values.category)) {
                await request(`data/budgets`, {
                    method: 'POST',
                    payload: {
                        ...values,
                        limit: Number(values.limit)
                    },
                    auth: accessToken
                })
            } else {
                const selectedBudget = budgets.find(budget => budget.category === values.category)
                await request(`data/budgets/${selectedBudget._id}`, {
                    method: 'PATCH',
                    payload: { limit: Number(values.limit) },
                    auth: accessToken
                })
            }
            onBudgetCreated(budget => budget + 1);
        } catch (error) {
            console.log(error.message)
        }
    };

    const { values, submitAction, getInputProps, errors, submitted } = useForm({ category: '', limit: '' }, requiredFields, onBudgetSubmit);

    return (
        <DashWidget size="large">
            <h2 className="mb-1 text-lg font-semibold text-white">
                Add Budget
            </h2>
            <p className="mb-5 text-sm text-white/45">
                Set a <u className="text-white/80">New</u> spending limit for a category
            </p>

            <form className="flex flex-col gap-4" action={submitAction}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget-category" className="text-sm text-white/65">Category</label>
                    <select
                        id="budget-category"
                        {...getInputProps('category')}
                        className={`rounded-xl border ${submitted && errors.category
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/10 focus:border-violet-500'
                            } bg-[#252630] px-3 py-2.5 text-sm text-white/70 outline-none`}
                    >
                        <option value="" disabled>Select category</option>
                        <option>Groceries</option>
                        <option>Housing</option>
                        <option>Transport</option>
                        <option>Entertainment</option>
                        <option>Dining</option>
                        <option>Utilities</option>
                        <option>Health</option>
                        <option>Shopping</option>

                        <option>Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="budget-limit" className="text-sm text-white/65">Monthly limit (€)</label>
                    <input
                        id="budget-limit"
                        {...getInputProps('limit')}
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="e.g. 250.00"
                        className={`rounded-xl border ${submitted && errors.limit
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-white/10 focus:border-violet-500'
                            } bg-white/3 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/25`}
                    />
                </div>

                <button
                    type="submit"
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