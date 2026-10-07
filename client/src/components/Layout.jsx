import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;