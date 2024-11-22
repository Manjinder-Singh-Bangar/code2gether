import { useLocation, Outlet, Navigate } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const RequireAuth = () =>{
    const {auth} = UseAuth();
    const location = useLocation();
    return (
        auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;