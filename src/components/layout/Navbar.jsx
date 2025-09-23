import React from "react";
import Tabs from "./Tabs.jsx";
import Button from "../ui/Button.jsx";
import { Link } from "react-router-dom";

export default function NavBar({ activeTab }) {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <h1 className="title">Teacher_name</h1>
                <Tabs activeTab={activeTab} />
            </div>
            <div className="navbar-right">
                <Button className="primary">Sign in</Button>
            </div>
        </div>
    );
}
