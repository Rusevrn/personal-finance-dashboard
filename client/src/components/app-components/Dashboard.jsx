import { useParams } from "react-router";
import DashboardOverview from "../../pages/finance/DashboardOverview";
import Transactions from "../../pages/finance/Transactions";
import Income from "../../pages/finance/Income";
import Budget from "../../pages/finance/Budget";
import Expense from "../../pages/finance/Expense";

const Dashboard = () => {
    const { section } = useParams();

    return (
        <section className="flex relative w-[80%] border rounded-3xl p-5 text-white border-white/8">
            <div className="absolute top-0 left-1/2 h-px w-[93%] -translate-x-1/2 bg-linear-to-r from-transparent via-violet-600 to-transparent" />
            <div className="absolute left-0 top-1/2 h-[90%] w-px -translate-y-1/2 bg-linear-to-b from-transparent via-violet-600 to-transparent" />

            {!section && <DashboardOverview />}

            {section === 'transactions' && <Transactions />}
            {section === 'expenses' && <Expense />}
            {section === 'budgets' && <Budget />}
            {section === 'income' && <Income />}

        </section>
    );
};

export default Dashboard;