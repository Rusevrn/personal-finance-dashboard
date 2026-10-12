import { FaShoppingCart, FaCar, FaGooglePay, FaSpotify } from "react-icons/fa";
import { FaWallet, FaHouse } from "react-icons/fa6";
import { SiLidl, SiNetflix, SiKaufland } from "react-icons/si";

const categoryIcon = {
    'Transport': <FaCar className="text-lg text-violet-400" />,
    'Salary': <FaWallet className="text-lg text-violet-400" />,
    'Housing': <FaHouse className="text-lg text-violet-400" />,
    'Groceries': <FaShoppingCart className="text-lg text-violet-400" />
};

const merchantIcons = {
    'Lidl': <SiLidl className="text-lg text-blue-600" />,
    'Kaufland': <SiKaufland className="text-lg text-red-500" />,
    'Googlepay': <FaGooglePay className="text-3xl text-blue-400" />,
    'Netflix': <SiNetflix className="text-lg text-red-500" />,
    'Spotify': <FaSpotify className="text-lg text-green-500" />
};

const TransactionItem = ({ merchant, date, amount, type }) => {

    const formattedAmount = new Intl.NumberFormat("en-IE", {
        style: "currency",
        currency: "EUR",
        signDisplay: "always"
    }).format(type === "income" ? Math.abs(amount) : -Math.abs(amount));

    const icon =
        merchantIcons[merchant] ??
        categoryIcon[merchant] ??
        String(merchant).charAt(0).toUpperCase();

    return (
        <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-sm text-gray-300">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">
                    {merchant}
                </p>
                <p className="text-xs text-gray-500">
                    {date}
                </p>
            </div>

            <p className={`text-sm font-medium ${type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {formattedAmount}
            </p>
        </div>
    );
};

export default TransactionItem;