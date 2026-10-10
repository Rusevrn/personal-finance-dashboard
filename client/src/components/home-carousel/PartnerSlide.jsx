import { FiUser } from "react-icons/fi";
import { Link } from "react-router";

const PartnerSlide = () => {

    return (
        <div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
            <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-4xl font-semibold text-white">
                    Your next financial move starts here.
                </h1>

                <p className="font-medium text-gray-300">
                    Connect with trusted financial professionals who can help you make smarter decisions about saving, spending, and investing.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-white">
                        The Zzap Partner Network
                    </h2>

                    <p className="text-gray-300">
                        Meet professionals who can help you turn your financial goals into a plan.
                    </p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-3">
                    <div className="flex h-24 w-20 items-center justify-center rounded-xl bg-white/5 text-gray-400">
                        <FiUser size={36} />
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        <h3 className="text-lg font-semibold text-white">
                            John Doe
                        </h3>

                        <p className="text-sm text-gray-400">
                            Financial Consultant
                        </p>

                        <Link to={'/partners'} className="mt-2 rounded-xl border border-violet-400 px-3 py-1.5 text-sm text-violet-400 transition hover:border-transparent hover:bg-violet-500 hover:text-white">
                            Meet our partners
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerSlide;