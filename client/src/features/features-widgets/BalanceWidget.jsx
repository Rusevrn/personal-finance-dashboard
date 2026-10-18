import { useContext } from "react";
import DashWidget from "../../components/app-components/widgets/DashWidget";
import UserContext from "../../context/UserContext";

const BalanceWidget = ({ size }) => {
    const { user: { balance } } = useContext(UserContext);

    return (
        <DashWidget size={size} type='balance'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Balance /m</p>

                <p className="text-2xl font-semibold text-white">
                    €{balance}
                </p>
            </div>
        </DashWidget>
    );
};

export default BalanceWidget;