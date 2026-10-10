import Balance from "./Balance";
import Income from "./Income";
import Expense from "./Expense";
import DashWidget from "./DashWidget";
import { SiNetflix, SiSpotify } from 'react-icons/si';
import { FaAmazon } from "react-icons/fa";
import SpendingChart from "./SpendingChart";
import TransactionItem from "./TransactionItem";

const Dashboard = () => {

    return (
        <section className="flex relative w-[80%] border rounded-3xl p-5 text-white border-white/8">
            <div className="absolute top-0 left-1/2 h-px w-[93%] -translate-x-1/2 bg-linear-to-r from-transparent via-violet-600 to-transparent" />
            <div className="absolute left-0 top-1/2 h-[90%] w-px -translate-y-1/2 bg-linear-to-b from-transparent via-violet-600 to-transparent" />

            <div className="flex flex-col w-[75%] pr-6">
                <div className="flex items-start justify-between pr-1.5 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-400">Manage your finance and overview</p>
                    </div>
                    <div>
                        <button
                            className="rounded-xl border border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-white/6 hover:text-white"
                        >+ Add widget</button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 auto-rows-37.5 grid-flow-row-dense pt-1">

                    <DashWidget size='small' type='balance'>
                        <Balance />
                    </DashWidget>

                    <DashWidget size='small' type='income'>
                        <Income />
                    </DashWidget>

                    <DashWidget size='small' type='expense'>
                        <Expense />
                    </DashWidget>

                    <DashWidget size='large' type='spending'>
                        <SpendingChart />
                    </DashWidget>

                </div>
            </div>
            <div className="w-[25%] border-l border-white/5 pl-6">
                <div className="grid grid-cols-2 gap-7 auto-rows-37.5">
                    <DashWidget size='large'>
                        <h2 className="text-lg font-semibold text-white">
                            Recent transactions
                        </h2>
                        <TransactionItem merchant={'Netflix'} date={'Today'} amount={-15} type={'expense'} />
                        <TransactionItem merchant={'Spotify'} date={'Yesterday'} amount={-10} type={'expense'} />
                        <TransactionItem merchant={'Salary'} date={'Sep 30'} amount={2950} type={'income'} />
                        <TransactionItem merchant={'Googlepay'} date={'Sep 30'} amount={-42.50} type={'expense'} />
                        <TransactionItem merchant={'Kaufland'} date={'Sep 28'} amount={-67.30} type={'expense'} />
                    </DashWidget>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;