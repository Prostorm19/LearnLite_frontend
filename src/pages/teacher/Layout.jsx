import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/layout/Navbar.jsx";
import "./TeacherDashboard.css";

export default function Layout() {
    const location = useLocation();
    // Extracts the active tab from the URL, e.g., "lectures" from "/dashboard/lectures"
    const pathParts = location.pathname.split('/');
    const activeTab = pathParts[2] || "lectures";

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

