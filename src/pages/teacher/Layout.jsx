import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/layout/Navbar";
import "./TeacherDashboard.css";

export default function Layout() {
    const location = useLocation();
    // Extract the current path and set it as the active tab
    const activeTab = location.pathname.substring(1) || "lectures";

    return (
        <div className="dashboard">
            <NavBar activeTab={activeTab} />
            <div className="dashboard-content">
                {/* The Outlet component will render the matched child route component */}
                <Outlet />
            </div>
        </div>
    );
}
