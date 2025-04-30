import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main style={{ height: "calc(100vh - 70px)"}}>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    );
};

export default MainLayout;
