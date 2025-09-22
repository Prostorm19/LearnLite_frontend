import React from "react";

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Tabs({ activeTab, setActiveTab }) {
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
                <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`tab ${activeTab === t ? "active" : ""}`}
                >
                    {capitalize(t)}
                </button>
            ))}
        </nav>
    );
}