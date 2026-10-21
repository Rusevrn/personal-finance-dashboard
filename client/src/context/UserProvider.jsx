import useAuth from "../hooks/useAuth";
import UserContext from "./UserContext";
import { Outlet } from "react-router";

const UserProvider = () => {
    const { user, loginHandler, logoutHandler, auth, balanceUpdate } = useAuth();

    return (
        <UserContext.Provider value={{ user, loginHandler, logoutHandler, auth, balanceUpdate }}>
            <Outlet />
        </UserContext.Provider>
    );
};

export default UserProvider;