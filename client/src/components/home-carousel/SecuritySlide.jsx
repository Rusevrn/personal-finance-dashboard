import { FiShield, FiLock, FiEye } from "react-icons/fi";
import { Link } from "react-router";

const SecuritySlide = () => {

    return (
        <div className="flex flex-col gap-8 p-8 sm:flex-row sm:items-center sm:gap-12 sm:py-4">
            <div className="flex-1 space-y-4 text-center sm:text-left">
                <h1 className="text-4xl font-semibold text-white">
                    Your finances deserve a safer space.
                </h1>

                <p className="font-medium text-gray-300">
                    Take control of your financial picture with a clear,
                    organized overview of your money, all in one place.
                </p>
                <Link to={'/security'} className="border-violet-400 border rounded-2xl p-1.5 transition text-violet-400 hover:border-transparent hover:bg-violet-500 hover:text-white active:bg-violet-700 active:text-white">
                    For the curious
                </Link>
            </div>

            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/3 p-4">
                    <FiShield className="mt-1 shrink-0 text-violet-400" size={24} />
                    <div>
                        <h2 className="font-semibold text-white">
                            Your finances, organized
                        </h2>
                        <p className="text-sm text-gray-400">
                            Keep your income, expenses, and budgets easy to
                            understand in one dashboard.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/3 p-4">
                    <FiLock className="mt-1 shrink-0 text-violet-400" size={24} />
                    <div>
                        <h2 className="font-semibold text-white">
                            Account access matters
                        </h2>
                        <p className="text-sm text-gray-400">
                            Sign-in and account access should be handled with
                            care as Zzap continues to develop.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/3 p-4">
                    <FiEye className="mt-1 shrink-0 text-violet-400" size={24} />
                    <div>
                        <h2 className="font-semibold text-white">
                            Know where you stand
                        </h2>
                        <p className="text-sm text-gray-400">
                            Clear summaries help you review your financial
                            activity and make more informed decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySlide;