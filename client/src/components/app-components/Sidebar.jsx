import { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi'
import { Link } from 'react-router';
import UserContext from '../../context/UserContext';

const Sidebar = () => {
    const { logoutHandler } = useContext(UserContext);

    const buttonStyle = "block w-full rounded-xl px-3 py-2.5 text-left text-base text-gray-300 transition hover:bg-white/[0.04] hover:text-white"
    return (
        <div className="flex flex-col relative w-[15%] border rounded-3xl border-white/8 text-white p-1.5 text-xl  justify-between sm">
            <div className="absolute top-0 left-1/2 h-px w-[93%] -translate-x-1/2 bg-linear-to-r from-transparent via-violet-600 to-transparent" />
            <div className="absolute right-0 top-1/2 h-[90%] w-px -translate-y-1/2 bg-linear-to-b from-transparent via-violet-600 to-transparent" />
            <div className="flex flex-col gap-5 max-h-fit pt-5">

                <Link to={'/app'} className={`${buttonStyle}`}>Dashboard</Link>
                <Link to={'/app/income'} className={`${buttonStyle}`}>Income</Link>
                <Link to={'/app/expenses'} className={`${buttonStyle}`}>Expenses</Link>
                <Link to={'/app/budgets'} className={`${buttonStyle}`}>Budgets</Link>
            </div>
            <Link to={'/'} onClick={logoutHandler} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-base text-gray-300 transition hover:bg-white/4 hover:text-white">
                <FiLogOut className="text-lg" />
                <span>Log out</span>
            </Link>
        </div>
    );
};

export default Sidebar;