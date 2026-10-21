import DashWidget from "../../components/app-components/widgets/DashWidget";
import { useParams } from "react-router";
import { FiPlus } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";

const requiredFields = ['amount', 'category', 'date'];

const TransactionFormWidget = ({ transactionType, onTransactionCreated }) => {
    const { section } = useParams();
    const { user: { accessToken, balance }, balanceUpdate } = useContext(UserContext);
    const { request } = useFetch();
    const [action, setAction] = useState(
        section === 'expenses'
            ? 'expense'
            : section ?? transactionType ?? 'income'
    );

    const initialValues = {
        merchant: '',
        amount: '',
        type: '',
        date: '',
        month: ``,
        category: ''
    }

    const onTransactionSubmit = async () => {
        try {
            if (Number(values.amount) > Number(balance) && action === 'expense') {
                throw new Error('Transaction canceled: Not enough in balance.')
            }
            await request(`data/transactions`, {
                method: 'POST',
                payload: {
                    ...values,
                    type: action,
                    amount: Number(values.amount),
                    month: values.date.slice(0, 7)
                },
                auth: accessToken
            })

            try {
                await balanceUpdate(values.amount, action);
            } catch (error) {
                console.log('Transaction was saved but your balance could not be updated.')
            }

            onTransactionCreated(transaction => transaction + 1);
        } catch (error) {
            console.log(error.message)
        }
    }

    const { values, submitAction, getInputProps, errors, submitted } = useForm(initialValues, requiredFields, onTransactionSubmit);

    return (
        <DashWidget size="large">
            <div className="flex justify-between">
                <div>
                    <h2 className="mb-1 text-lg font-semibold text-white">
                        {action === 'income' ? 'Add Income' : 'Add Expense'}
                    </h2>
                    <p className="mb-5 text-sm text-white/45">
                        Record a new transaction
                    </p>
                </div>

                {!section &&
                    <button className="flex rounded-xl h-fit border items-center border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-white/6 hover:text-white"
                        onClick={() => setAction(currentAction => currentAction === 'income' ? 'expense' : 'income')}>
                        {action === 'income' ? 'Expense' : 'Income'}<GrTransaction className="text-sm text-violet-400 ml-1.5" />
                    </button>
                }

            </div>

            <form action={submitAction} className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="merchant" className="text-sm text-white/65">Merchant</label>
                    <input
                        id="merchant"
                        {...getInputProps('merchant')}
                        type="text"
                        placeholder="e.g. Kaufland"
                        className="rounded-xl border border-white/10 bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="amount" className="text-sm text-white/65">Amount (€)</label>
                    <input
                        id="amount"
                        {...getInputProps('amount')}
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        className={`rounded-xl border ${submitted && errors.amount ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-violet-500'
                            } bg-white/3 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25`}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="category" className="text-sm text-white/65">Category</label>
                    <select
                        id="category"
                        {...getInputProps('category')}
                        className={`rounded-xl border ${submitted && errors.category ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-violet-500'
                            } bg-[#252630] px-3 py-2.5 text-sm text-white/70 outline-none transition`}
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        {action === 'income'
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
                                <option value="Utilities">Utilities</option>
                                <option value="Health">Health</option>
                                <option value="Shopping">Shopping</option>
                            </>
                        }
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="date" className="text-sm text-white/65">Date</label>
                    <input
                        id="date"
                        {...getInputProps('date')}
                        type="date"
                        className={`rounded-xl border ${submitted && errors.date ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-violet-500'
                            } bg-white/3 px-3 py-2.5 text-sm text-white/70 outline-none transition`}
                    />
                </div>

                <div className="sm:col-span-2">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
                        type="submit"
                    ><FiPlus size={16} />Add Transaction</button>
                </div>
            </form>
        </DashWidget>
    );
};

export default TransactionFormWidget;
