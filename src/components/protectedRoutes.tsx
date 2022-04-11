import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from 'lodash';

const ProtectedRoutes = (prop: any) => {
    const userAuth = useSelector((state: any) => state.user)
    console.log('=====', !_.isEmpty(userAuth))
    return (userAuth.name != '') ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes