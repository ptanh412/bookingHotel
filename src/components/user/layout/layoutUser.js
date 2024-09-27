import Header from "../header/header";
import Footer from "../footer/footer";
import React from "react";

const LayoutUser = ({ children, ...props }) => {
    return (
        <div {...props} className="min-h-screen bg-gray-100">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
export default LayoutUser;