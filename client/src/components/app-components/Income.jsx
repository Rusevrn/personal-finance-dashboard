import DashWidget from "./DashWidget";

const Income = () => {

    return (
        <DashWidget size='small' type='income'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Income</p>

                <p className="text-3xl font-semibold text-emerald-400">
                    +€2,950
                </p>
            </div>
        </DashWidget>

    );
};

export default Income;