import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";
import authUser, { tokenLogout } from '../features/auth/authUser';
import { useEffect } from "react";


const Layout = () => {
    useEffect(() => {
        authUser().then((result) => {
            if(!result.status){
                tokenLogout(result);
            }
            // console.log(result);
        });
    }, [])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Layout;