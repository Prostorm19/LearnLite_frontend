import React, { useState } from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

// This is a simple data structure to hold the navigation items.
const settingsNavItems = ["Profile", "Preferences", "View Mode", "Shortcuts"];

// This is the component for the left-side navigation.
const SettingsNav = ({ activeItem, setActiveItem }) => (
    <nav className="settings-nav">
        {settingsNavItems.map((item) => (
            <button
                key={item}
                className={`settings-nav-item ${activeItem === item ? "active" : ""}`}
                onClick={() => setActiveItem(item)}
            >
                {item}
            </button>
        ))}
    </nav>
);

// This component renders the content for the "Profile" tab.
const ProfileSettings = () => (
    <div>
        <div className="profile-header">
            <div className="profile-avatar">
                {/* You can replace this with an actual <img> tag */}
                <span>AR</span>
            </div>
            <div className="profile-info">
                <h4>Alexa Rawles</h4>
                <p>alexarawles@gmail.com</p>
            </div>
            <Button className="outline">Edit</Button>
        </div>

        <div className="profile-form">
            <div className="form-grid">
                <div className="form-group">
                    <label>Full Name</label>
                    <input defaultValue="Alexa Rawles" disabled />
                </div>
                <div className="form-group">
                    <label>Nick Name</label>
                    <input defaultValue="Alexa" disabled />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select disabled>
                        <option>Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <select disabled>
                        <option>United States</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Language</label>
                    <select disabled>
                        <option>English</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Time Zone</label>
                    <select disabled>
                        <option>(GMT-12:00) International Date Line West</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="email-settings">
            <h4>My email Address</h4>
            <div className="email-row">
                <div>
                    <p>alexarawles@gmail.com</p>
                    <small>1 month ago</small>
                </div>
            </div>
            <button className="add-email-btn">+ Add Email Address</button>
        </div>
    </div>
);


export default function Settings() {
    // 'useState' holds the currently selected setting. 'Profile' is the default.
    const [activeSetting, setActiveSetting] = useState("Profile");

    // This function will decide which content to show based on the activeSetting state.
    const renderContent = () => {
        switch (activeSetting) {
            case "Profile":
                return <ProfileSettings />;
            // You can add more cases here for other settings pages
            case "Preferences":
                return <p>Preferences settings will be shown here.</p>;
            case "View Mode":
                return <p>View Mode settings will be shown here.</p>;
            case "Shortcuts":
                return <p>Shortcuts settings will be shown here.</p>;
            default:
                return <ProfileSettings />;
        }
    };

    return (
        <div className="settings-layout">
            <SettingsNav activeItem={activeSetting} setActiveItem={setActiveSetting} />
            <div className="settings-content">
                <Panel>
                    {renderContent()}
                </Panel>
            </div>
        </div>
    );
}