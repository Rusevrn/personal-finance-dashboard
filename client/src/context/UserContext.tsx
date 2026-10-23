import { createContext } from "react";

type User = {
    email: string;
    _id: string;
    accessToken: string;
}

const UserContext = createContext({
    user: {} as User,
    loginHandler: async () => { },
    logoutHandler: async () => { }
});

export default UserContext;