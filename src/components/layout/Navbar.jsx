import React from "react";
import Tabs from "./Tabs";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function NavBar({ activeTab }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // This function will be called when the button is clicked,
        // and it navigates the user back to the root path.
        navigate('/');
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <h1 className="title">Teacher_name</h1>
                <Tabs activeTab={activeTab} />
            </div>
            <div className="navbar-right">
                <Button className="outline" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    );
}

