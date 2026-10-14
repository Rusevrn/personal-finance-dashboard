import DashWidget from "../../components/app-components/widgets/DashWidget";

const IncomeWidget = ({ size }) => {

    return (
        <DashWidget size={size} type='income'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Income</p>

                <p className="text-2xl font-semibold text-emerald-400">
                    +€2,950
                </p>
            </div>
        </DashWidget>

    );
};

export default IncomeWidget;