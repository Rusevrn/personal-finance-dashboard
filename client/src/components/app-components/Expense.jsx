import DashWidget from "./DashWidget";

const Expense = () => {

    return (
        <DashWidget size='small' type='expense'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Expenses</p>

                <p className="text-3xl font-semibold text-red-400">
                    -€1,740
                </p>
            </div>
        </DashWidget>
    );
};

export default Expense;