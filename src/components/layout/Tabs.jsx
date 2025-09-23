import React from "react";
import { Link } from "react-router-dom";

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Tabs({ activeTab }) {
    const tabs = [
        "lectures",
        "upload",
        "analytics",
        "assignments",
        "quiz",
        "schedule",
        "settings",
    ];
    return (
        <nav className="tabs">
            {tabs.map((t) => (
                <Link
                    key={t}
                    to={`/${t}`}
                    className={`tab ${activeTab === t ? "active" : ""}`}
                >
                    {capitalize(t)}
                </Link>
            ))}
        </nav>
    );
}