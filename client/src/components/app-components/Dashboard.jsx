import Balance from "./Balance";
import Income from "./Income";
import Expense from "./Expense";
import DashWidget from "./DashWidget";
import { SiNetflix, SiSpotify } from 'react-icons/si';
import { FiShoppingBag } from 'react-icons/fi';
import SpendingChart from "./SpendingChart";

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
                        >+ Add graph</button>
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
                <div className="grid grid-cols-2 gap-4 auto-rows-37.5">
                    <DashWidget size='long'>
                        <h2 className="text-lg font-semibold text-white">
                            Recent transactions
                        </h2>

                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm text-gray-300">
                                <SiNetflix className="text-lg text-red-500" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white">
                                    Netflix
                                </p>
                                <p className="text-xs text-gray-500">
                                    Today
                                </p>
                            </div>

                            <p className="text-sm font-medium text-red-400">
                                -€15.99
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm text-gray-300">
                                <SiSpotify className="text-lg text-green-500" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white">
                                    Spotify
                                </p>
                                <p className="text-xs text-gray-500">
                                    Yesterday
                                </p>
                            </div>

                            <p className="text-sm font-medium text-red-400">
                                -€10.99
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm text-gray-300">
                                €
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white">
                                    Salary
                                </p>
                                <p className="text-xs text-gray-500">
                                    Sep 30
                                </p>
                            </div>

                            <p className="text-sm font-medium text-emerald-400">
                                +€2,950
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm text-gray-300">
                                <FiShoppingBag className="text-lg text-orange-400" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white">
                                    Amazon
                                </p>
                                <p className="text-xs text-gray-500">
                                    Sep 29
                                </p>
                            </div>

                            <p className="text-sm font-medium text-red-400">
                                -€42.50
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm text-gray-300">
                                G
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-white">
                                    Grocery Store
                                </p>
                                <p className="text-xs text-gray-500">
                                    Sep 28
                                </p>
                            </div>

                            <p className="text-sm font-medium text-red-400">
                                -€67.30
                            </p>
                        </div>

                    </DashWidget>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;