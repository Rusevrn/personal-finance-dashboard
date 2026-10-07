import Dashboard from "../components/app-components/Dashboard";
import Sidebar from "../components/app-components/Sidebar";
import Header from "../components/Header";

const Zzap = () => {

    return (
        <>
            <Header appVariant />
            <section className="h-screen pt-30 justify-center px-4">
                <div className="flex h-full pb-5 w-full justify-around">
                    <Sidebar />
                    <Dashboard />
                </div>
            </section>
        </>

    );
};

export default Zzap;