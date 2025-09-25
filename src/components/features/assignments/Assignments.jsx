import React, { useState, useMemo } from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

// Helper to format dates like "Sep 26th"
const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    let daySuffix = 'th';
    if (day === 1 || day === 21 || day === 31) daySuffix = 'st';
    else if (day === 2 || day === 22) daySuffix = 'nd';
    else if (day === 3 || day === 23) daySuffix = 'rd';

    return `${month} ${day}${daySuffix}`;
};


// Helper to get relative day info like "Tomorrow" or "Saturday"
const getDayInfo = (date) => {
    const today = new Date('2025-09-25T23:43:00'); // Mock current date for consistency
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
};

// More detailed static data for assignments
const initialAssignments = [
    {
        id: 1,
        title: "Experiment 6 - Implementation of Binary Search Tree",
        dueDate: new Date("2025-09-26T23:59:00"),
        course: "AY 2025-26 MCA Sem I DSA - Batch 2",
        status: "Upcoming",
        initials: "AM",
        color: "#ef4444"
    },
    {
        id: 2,
        title: "Practical 10: Disk Scheduling",
        dueDate: new Date("2025-09-27T23:59:00"),
        course: "MCA B2 2025-26",
        status: "Upcoming",
        initials: "MB",
        color: "#8b5cf6"
    },
    {
        id: 3,
        title: "Exp-8 Generics",
        dueDate: new Date("2025-10-01T23:59:00"),
        course: "Java Programming - MCA Sem I 2025-26",
        status: "Upcoming",
        initials: "JP",
        color: "#f97316"
    },
    {
        id: 4,
        title: "Case Study 1",
        dueDate: new Date("2025-09-24T23:59:00"),
        course: "Business Analytics",
        status: "Past due",
        initials: "CS",
        color: "#6b7280"
    },
    {
        id: 5,
        title: "Mid-Term Report",
        dueDate: new Date("2025-09-20T23:59:00"),
        course: "Advanced Algorithms",
        status: "Completed",
        initials: "MT",
        color: "#10b981"
    },
];


export default function Assignments() {
    const [activeTab, setActiveTab] = useState('Upcoming');

    // Filter assignments based on the active tab and sort by date
    const filteredAssignments = useMemo(() => {
        return initialAssignments
            .filter(a => a.status === activeTab)
            .sort((a, b) => a.dueDate - b.dueDate);
    }, [activeTab]);

    // Group the filtered assignments by their formatted due date
    const groupedAssignments = useMemo(() => {
        return filteredAssignments.reduce((acc, assignment) => {
            const dateKey = formatDate(assignment.dueDate);
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(assignment);
            return acc;
        }, {});
    }, [filteredAssignments]);

    return (
        <Panel>
            <div className="assignments-header">
                <div className="assignment-tabs">
                    <button className={`assignment-tab ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</button>
                    <button className={`assignment-tab ${activeTab === 'Past due' ? 'active' : ''}`} onClick={() => setActiveTab('Past due')}>Past due</button>
                    <button className={`assignment-tab ${activeTab === 'Completed' ? 'active' : ''}`} onClick={() => setActiveTab('Completed')}>Completed</button>
                </div>
                <div className="panel-actions">
                    <Button className="primary">Create New Assignment</Button>
                </div>
            </div>

            <div className="assignments-content">
                {Object.keys(groupedAssignments).length > 0 ? (
                    Object.entries(groupedAssignments).map(([date, assignments]) => (
                        <div key={date} className="assignment-date-group">
                            <div className="assignment-group-header">
                                <strong>{date}</strong>
                                <span>{getDayInfo(assignments[0].dueDate)}</span>
                            </div>
                            {assignments.map(assignment => (
                                <div key={assignment.id} className="assignment-card">
                                    <div className="assignment-icon" style={{ backgroundColor: assignment.color }}>
                                        {assignment.initials}
                                    </div>
                                    <div className="assignment-details">
                                        <div className="assignment-card-title">{assignment.title}</div>
                                        <div className="assignment-card-meta">
                                            Due at {assignment.dueDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                                        </div>
                                        <div className="assignment-card-course">{assignment.course}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-center text-gray-500">No {activeTab.toLowerCase()} assignments.</p>
                )}
            </div>
        </Panel>
    );
}
