import React from "react";
import { Outlet } from 'react-router-dom';
import { NavbarPage } from "../navbar/NavbarPage";


export function Layout() {
    return (
        <>
            <NavbarPage />
            <Outlet />
        </>
    );
}