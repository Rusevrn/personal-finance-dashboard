import { createContext } from "react";

const UserContext = createContext({
    user: {},
    loginHandler: async () => { },
    logoutHandler: async () => { }
});

export default UserContext;