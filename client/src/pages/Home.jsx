const Home = () => {

    return (
        <>
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">
                    <div className="space-y-2 text-center sm:text-left">
                        <div className="space-y-0.5">
                            <h1 className=" text-4xl font-semibold text-white">Zzap away the chaos.</h1>
                            <p className="font-medium text-gray-300">
                                Take control of your money with a clear overview of your income, spending, budgets, and savings — all in one place.
                            </p>
                        </div>
                        <button className="border-violet-400 border rounded-2xl p-1.5 transition text-violet-400 hover:border-transparent hover:bg-violet-500 hover:text-white active:bg-violet-700 active:text-white">
                            Explore Zzap
                        </button>
                    </div>
                    <img src="/images/dash-showcase.png" alt="Dashboard showcase"/>
                </div>
            </div>
        </>
    );
};

export default Home;