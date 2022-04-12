import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = (prop: any) => {
    const userAuth = useSelector((state: any) => state.user)
    return (userAuth.name != '') ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes