import DashWidget from "./DashWidget";

const Balance = () => {

    return (
        <DashWidget size='small' type='balance'>
            <div className="flex h-full flex-col items-center justify-between">
                <p className="text-sm text-gray-400">Balance</p>

                <p className="text-3xl font-semibold text-white">
                    €4,280
                </p>
            </div>
        </DashWidget>
    );
};

export default Balance;