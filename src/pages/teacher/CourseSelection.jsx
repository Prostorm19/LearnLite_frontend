import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Panel from '../../components/ui/Panel.jsx';
import './TeacherDashboard.css'; // Using the existing CSS file for styles

// Static data for courses and subjects
const courses = ['MCA', 'MTECH', 'BTECH', 'MBA (Tech)'];
const subjectsByCourse = {
    MCA: ['Data Structures', 'Advanced Algorithms', 'Database Systems'],
    MTECH: ['Machine Learning', 'Advanced Algorithms', 'Cloud Computing'],
    BTECH: ['Introduction to Programming', 'Digital Logic', 'Mathematics I'],
    'MBA (Tech)': ['Business Strategy', 'Marketing Analytics', 'Financial Management'],
};

export default function CourseSelection() {
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    const [selectedSubject, setSelectedSubject] = useState(subjectsByCourse[courses[0]][0]);
    const navigate = useNavigate();

    // Handles changes to the course dropdown
    const handleCourseChange = (e) => {
        const course = e.target.value;
        setSelectedCourse(course);
        // Reset subject to the first one in the new course list
        setSelectedSubject(subjectsByCourse[course][0]);
    };

    // Navigates to the dashboard on form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, it navigates to the generic dashboard.
        // Later, you can pass course and subject, e.g., `/dashboard/${selectedCourse}/${selectedSubject}`
        navigate('/dashboard/lectures');
    };

    return (
        <div className="selection-container">
            <Panel>
                <div className="selection-header">
                    <h2>Select Course and Subject</h2>
                    <p>Please choose your course and subject to proceed to the dashboard.</p>
                </div>
                <form onSubmit={handleSubmit} className="selection-form">
                    <div className="form-group">
                        <label htmlFor="course-select">Course</label>
                        <select id="course-select" value={selectedCourse} onChange={handleCourseChange}>
                            {courses.map((course) => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject-select">Subject</label>
                        <select id="subject-select" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                            {subjectsByCourse[selectedCourse].map((subject) => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>
                    <Button className="primary full-width" type="submit">
                        Go to Dashboard
                    </Button>
                </form>
            </Panel>
        </div>
    );
}

