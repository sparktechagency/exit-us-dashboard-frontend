import React from 'react';

import { Outlet } from 'react-router-dom';
// import HeaderDashboard from './HeaderDashboard';
import Sidebar from './Sidebar';
import HeaderDashboard from './HeaderDashboard';

const MainLayout: React.FC = () => {
    return (
        <div className="grid grid-cols-12 h-screen">
            {/* side bar */}
            <div className="col-span-2 overflow-hidden h-screen border-r-2 border-[#ffbc58]">
                <Sidebar />
            </div>

            {/* main container with header */}
            <div className="col-span-10 h-screen">
                <div className="mb-8">
                    <HeaderDashboard />
                </div>

                <div className="overflow-y-auto  px-8">
                    <div className="h-full  rounded-md ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
