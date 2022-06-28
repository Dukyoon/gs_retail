import { PropertyKeys } from "ag-grid-community";
import React from "react";
import { Outlet } from "react-router";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
    return (
        <>
            <Header />
            <div className="content">
                <Sidebar />
                <div className="inner-content">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>

    )
    
}

export default Layout;