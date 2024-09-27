import Header from "../header/header";
import Dashboard from "../menu/menu";
import React from "react";

const LayoutAdmin = ({ children, ...props }) => {
    return (
        <div {...props} className="flex min-h-screen bg-gray-100">
            <Dashboard />
            <div className='flex flex-grow flex-col z-10'>
                <Header />
                {children}
            </div>
        </div>
    );
}

export default LayoutAdmin;