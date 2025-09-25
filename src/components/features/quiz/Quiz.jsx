import React, { useState } from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

// Sub-component for the "Create New" options
const CreateQuizOptions = ({ setView }) => (
    <div>
        <div className="create-assignment-options">
            <h3>How would you like to create the quiz?</h3>
            <div className="options-container">
                <div className="option-card">
                    <h4>
                        <span role="img" aria-label="robot">🤖</span> AI Generated
                    </h4>
                    <p>Generate quiz questions based on a topic or document.</p>
                    <Button className="primary">
                        Create with AI
                    </Button>
                </div>
                <div className="option-card">
                    <h4>
                        <span role="img" aria-label="pencil">✏️</span> Create Manually
                    </h4>
                    <p>Write your own questions and set up the quiz yourself.</p>
                    <Button className="outline">Create Manually</Button>
                </div>
            </div>
        </div>
        <Button onClick={() => setView('view')}>Back to Quizzes</Button>
    </div>
);


// Sub-component for viewing the list of existing quizzes
const ViewQuizzes = ({ quizzes }) => (
    <div className="quiz-list">
        <h3>View Existing</h3>
        {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-row">
                <div>
                    <div className="quiz-title">{quiz.title}</div>
                    <div className="quiz-meta">
                        {quiz.course} • {quiz.questions} Questions
                    </div>
                </div>
                <div className="quiz-actions">
                    <span className={`quiz-status ${quiz.status.toLowerCase()}`}>
                        {quiz.status}
                    </span>
                    <Button>Edit</Button>
                </div>
            </div>
        ))}
    </div>
);


export default function Quiz() {
    // State to manage which view is active: 'view' or 'create'
    const [view, setView] = useState('view');

    // Static data for the quizzes list
    const quizzes = [
        {
            id: 1,
            title: "Introduction to Data Structures",
            course: "MCA",
            questions: 15,
            status: "Published",
        },
        {
            id: 2,
            title: "Object-Oriented Programming Concepts",
            course: "MCA",
            questions: 25,
            status: "Draft",
        },
        {
            id: 3,
            title: "Linked Lists and Trees",
            course: "MCA",
            questions: 20,
            status: "Published",
        },
    ];

    // Renders the correct component based on the current view state
    const renderContent = () => {
        switch (view) {
            case 'create':
                return <CreateQuizOptions setView={setView} />;
            case 'view':
            default:
                return <ViewQuizzes quizzes={quizzes} />;
        }
    };


    return (
        <Panel>
            <div className="panel-header">
                <h2>Quizzes</h2>
                {view === 'view' && (
                    <Button className="primary" onClick={() => setView('create')}>Create new quiz</Button>
                )}
            </div>
            {renderContent()}
        </Panel>
    );
}
