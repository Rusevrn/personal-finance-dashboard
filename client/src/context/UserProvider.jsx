import { useState } from "react";
import UserContext from "./UserContext";
import { Outlet } from "react-router";

const UserProvider = () => {
    const [user, setUser] = useState();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Outlet />
        </UserContext.Provider>
    );
};

export default UserProvider;