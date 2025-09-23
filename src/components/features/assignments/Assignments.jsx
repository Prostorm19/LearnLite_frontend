import React, { useState } from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";
import StatusTag from "../../ui/StatusTag.jsx";

// Sub-component for the "Create New" options
const CreateAssignmentOptions = ({ setView }) => (
    <div>
        <div className="create-assignment-options">
            <h3>How would you like to create the assignment?</h3>
            <div className="options-container">
                <div className="option-card">
                    <h4>
                        <span role="img" aria-label="robot">🤖</span> AI Generated
                    </h4>
                    <p>Generate questions and structure with the help of AI.</p>
                    <Button className="primary">
                        Create with AI
                    </Button>
                </div>
                <div className="option-card">
                    <h4>
                        <span role="img" aria-label="pencil">✏️</span> Create Manually
                    </h4>
                    <p>Build the assignment from scratch with full control.</p>
                    <Button className="outline">Create Manually</Button>
                </div>
            </div>
        </div>
        <Button onClick={() => setView('view')}>Back to Assignments</Button>
    </div>
);

// Sub-component for viewing the list of existing assignments
const ViewAssignments = ({ assignments }) => (
    <div className="assignments-list">
        <h3>View Existing</h3>
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
);

// Sub-component for the grading view
const GradeAssignments = ({ setView }) => (
    <div>
        <h3>Check Assignments (Grading)</h3>
        <p>This section will show assignments that need grading.</p>
        <div className="assignments-list">
            <div className="assignment-row">
                <div>
                    <div className="assignment-title">Data Structures - Week 5 Submissions</div>
                    <div className="assignment-meta">
                        MCA • 32/40 Submitted
                    </div>
                </div>
                <div>
                    <Button className="primary">Start Grading</Button>
                </div>
            </div>
            <div className="assignment-row">
                <div>
                    <div className="assignment-title">Advanced Algorithms - Mid Term</div>
                    <div className="assignment-meta">
                        MTech • 18/25 Submitted
                    </div>
                </div>
                <div>
                    <Button className="primary">Start Grading</Button>
                </div>
            </div>
        </div>
        <Button onClick={() => setView('view')}>Back to Assignments</Button>
    </div>
);

export default function Assignments() {
    // State to manage which view is active: 'view', 'create', or 'grade'
    const [view, setView] = useState('view');

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

    // Renders the correct component based on the current view state
    const renderContent = () => {
        switch (view) {
            case 'create':
                return <CreateAssignmentOptions setView={setView} />;
            case 'grade':
                return <GradeAssignments setView={setView} />;
            case 'view':
            default:
                return <ViewAssignments assignments={assignments} />;
        }
    };

    return (
        <Panel>
            <div className="panel-header">
                <h2>Assignments</h2>
                {/* Show buttons only on the main view */}
                {view === 'view' && (
                    <div className="panel-actions">
                        <Button className="primary" onClick={() => setView('create')}>Create New Assignment</Button>
                        <Button onClick={() => setView('grade')}>Check Assignments</Button>
                    </div>
                )}
            </div>
            {renderContent()}
        </Panel>
    );
}
