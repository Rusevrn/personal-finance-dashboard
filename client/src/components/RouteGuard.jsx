import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from "../context/UserContext";

export default function RouteGuard() {
    const { user: { _id: id }, isCheckingSession } = useContext(UserContext);

    if (!id && !isCheckingSession) {
        return <Navigate to={'/login'} replace/>
    }

    if (isCheckingSession) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-slate-950">
                <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
                <p className="text-sm text-slate-400">Verifying session...</p>
            </div>
        );
    }

    if (id && isCheckingSession) {
        return (
            <Outlet />
        )
    }
}