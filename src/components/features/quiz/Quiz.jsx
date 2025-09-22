import React from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

export default function Quiz() {
    // Static data for the quizzes list
    const quizzes = [
        {
            id: 1,
            title: "Introduction to JavaScript Basics",
            course: "MCA",
            questions: 15,
            status: "Published",
        },
        {
            id: 2,
            title: "Machine Learning Concepts",
            course: "MTech",
            questions: 25,
            status: "Draft",
        },
        {
            id: 3,
            title: "Business Strategy Fundamentals",
            course: "MBA (Tech)",
            questions: 20,
            status: "Published",
        },
    ];

    return (
        <Panel>
            <div className="panel-header">
                <h2>Quizzes</h2>
                <Button className="primary">Create new quiz</Button>
            </div>
            <div className="quiz-list">
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
        </Panel>
    );
}