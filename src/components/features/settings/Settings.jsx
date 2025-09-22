import React from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

export default function Settings() {
    return (
        <Panel title="Settings">
            <div className="settings-layout">
                {/* Profile Settings Section */}
                <div className="settings-section">
                    <h3>Profile Information</h3>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input defaultValue="John Doe" />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input defaultValue="john.doe@example.com" type="email" />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <input defaultValue="Teacher" disabled />
                    </div>
                    <Button className="primary">Update Profile</Button>
                </div>

                {/* Password Settings Section */}
                <div className="settings-section">
                    <h3>Change Password</h3>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password" placeholder="Enter current password" />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button className="primary">Change Password</Button>
                </div>
            </div>
        </Panel>
    );
}