import React from "react";
import Tabs from "./Tabs.jsx";
import Button from "../ui/Button.jsx";

export default function NavBar({ activeTab, setActiveTab }) {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <h1 className="title">Teachers / Downloads</h1>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="navbar-right">
                <Button className="primary">Sign in</Button>
                <Button className="outline">Try Whimsical</Button>
            </div>
        </div>
    );
}