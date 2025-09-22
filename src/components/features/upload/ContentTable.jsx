import React from "react";
import StatusTag from "../../ui/StatusTag.jsx"; // Import the StatusTag component

export default function ContentTable() {
    // Static data for the table rows
    const rows = [
        {
            id: 1,
            name: "UX UI Design Blog Post",
            campaign: "Design Marketing",
            date: "20-01-2025",
            lastModified: "02 minute ago",
            status: "In Progress",
        },
        {
            id: 2,
            name: "Website Marketing Content",
            campaign: "Facebook Campaign",
            date: "18-01-2025",
            lastModified: "10 minute ago",
            status: "Completed",
        },
    ];

    return (
        <table className="content-table">
            <thead>
                <tr>
                    <th>Name Content</th>
                    <th>Campaign</th>
                    <th>Create Date</th>
                    <th>Last Modified</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.campaign}</td>
                        <td>{row.date}</td>
                        <td>{row.lastModified}</td>
                        <td>
                            <StatusTag status={row.status} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}