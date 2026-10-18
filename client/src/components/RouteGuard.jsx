import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from "../context/UserContext";

export default function RouteGuard() {
    const { user: { _id: id } } = useContext(UserContext);

    if (!id) {
        return <Navigate to={'/login'} />
    }

    return (
        <Outlet />
    )
}