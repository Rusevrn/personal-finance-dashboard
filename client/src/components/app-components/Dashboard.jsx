import Balance from "./Balance";
import Income from "./Income";
import Expense from "./Expense";
import SpendingChart from "./SpendingChart";
import RecentTransactions from "./RecentTransactions";
import { VscSettings } from "react-icons/vsc";
import { useParams } from "react-router";

const Dashboard = () => {
    const { section } = useParams();

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
                    {!section &&
                        <div>
                            <button
                                className="flex rounded-xl border border-white/10 bg-white/3 px-3 py-2 text-sm text-gray-300 transition hover:border-violet-400/50 hover:bg-white/6 hover:text-white"
                            > <VscSettings className="text-xl text-violet-400 mr-1.5" />Widgets</button>
                        </div>
                    }
                </div>

                <div className="grid grid-cols-4 gap-4 auto-rows-37.5 grid-flow-row-dense pt-1">
                    <Balance />
                    <Income />
                    <Expense />
                    <SpendingChart />
                </div>
            </div>
            <div className="w-[25%] border-l border-white/5 pl-6">
                <div className="grid grid-cols-2 gap-7 auto-rows-37.5">
                    <RecentTransactions />
                </div>
            </div>
        </section>
    );
};

export default Dashboard;