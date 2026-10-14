import IncomeWidget from "../features-widgets/IncomeWidget";
import OverTimeWidget from "../features-widgets/OverTimeWidget";
import TransactionFormWidget from "../features-widgets/TransactionFormWidget";
import TransactionsWidget from "../features-widgets/TransactionsWidget";

const incomeData = [
    { month: "August", amount: 1240.5 },
    { month: "September", amount: 1085.75 },
    { month: "October", amount: 1320.2 },
];

const income = [
    { id: 1, merchant: "Monthly Salary", category: "Salary", date: "Oct 12", type:'income', amount: 2450.00 },
    { id: 2, merchant: "Freelance Project", category: "Freelance", date: "Oct 10", type:'income', amount: 350.00 },
    { id: 3, merchant: "Amazon", category: "Refund", date: "Oct 9", type:'income', amount: 42.80 },
    { id: 4, merchant: "Dividend Payment", category: "Investments", date: "Oct 7", type:'income', amount: 68.50 },
    { id: 5, merchant: "Website Design", category: "Freelance", date: "Oct 5", type:'income',  amount: 180.00 },
    { id: 6, merchant: "Monthly Salary", category: "Salary", date: "Sep 12", type:'income',  amount: 2450.00 },
    { id: 7, merchant: "Freelance Project", category: "Freelance", date: "Sep 8", type:'income', amount: 275.00 },
    { id: 8, merchant: "Dividend Payment", category: "Investments", date: "Sep 3",type:'income', amount: 54.25 },
];

const Income = () => {

    return (
        <div className="flex flex-col w-full">

            <div className="mb-6">
                <h1 className="text-3xl font-bold">Income</h1>
                <p className="text-gray-400">Track your earnings and see where your money comes from.</p>
            </div>

            <div className="grid grid-cols-6 auto-rows-37.5 grid-flow-row-dense gap-4">
                <TransactionsWidget title={'Income transactions'} data={income} />
                <OverTimeWidget
                    title={'Income over three months'}
                    description={'Compare your monthly earnings'}
                    data={incomeData}
                    toolTipLabel={'Earned'}
                />
                <IncomeWidget size={'small'} />
                <TransactionFormWidget transactionType={'Income'}/>
            </div>

        </div>
    );
};

export default Income;