import useAuth from "../hooks/useAuth";
import UserContext from "./UserContext";
import { Outlet } from "react-router";

const UserProvider = () => {
    const { user, loginHandler, logoutHandler, auth, updateBalance, isCheckingSession } = useAuth();

    return (
        <UserContext.Provider value={{ user, loginHandler, logoutHandler, auth, updateBalance, isCheckingSession }}>
            <Outlet />
        </UserContext.Provider>
    );
};

export default UserProvider;