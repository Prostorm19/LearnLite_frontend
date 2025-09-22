import React from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";
import StatusTag from "../../ui/StatusTag.jsx"; // Reusing the StatusTag component

export default function Assignments() {
    // Static data for the assignments list
    const assignments = [
        {
            id: 1,
            title: "Data Structures - Week 5",
            course: "MCA",
            dueDate: "30-09-2025",
            status: "Upcoming",
        },
        {
            id: 2,
            title: "Advanced Algorithms - Mid Term",
            course: "MTech",
            dueDate: "15-10-2025",
            status: "Upcoming",
        },
        {
            id: 3,
            title: "Case Study Analysis",
            course: "MBA (Tech)",
            dueDate: "25-09-2025",
            status: "Graded",
        },
    ];

    return (
        <Panel>
            <div className="panel-header">
                <h2>Assignments</h2>
                <Button className="primary">Create new assignment</Button>
            </div>
            <div className="assignments-list">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="assignment-row">
                        <div>
                            <div className="assignment-title">{assignment.title}</div>
                            <div className="assignment-meta">
                                {assignment.course} • Due: {assignment.dueDate}
                            </div>
                        </div>
                        <div>
                            <StatusTag status={assignment.status} />
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}