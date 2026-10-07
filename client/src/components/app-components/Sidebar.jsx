const Sidebar = () => {

    return (
        <div className="flex flex-col w-[15%] border-2 rounded-3xl border-[#8a2e9273] text-white p-1.5 text-xl pl-4 justify-between">
            <div className="flex flex-col gap-2 max-h-fit">
                <button className="block w-full text-left">Dashboard</button>
                <button className="block w-full text-left">Transactions</button>
                <button className="block w-full text-left">Income</button>
                <button className="block w-full text-left">Expenses</button>
                <button className="block w-full text-left">Budgets</button>
            </div>
            <div>
                <button>probably exit button</button>
            </div>
        </div>
    );
};

export default Sidebar;