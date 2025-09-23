import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Panel from "/src/components/ui/Panel.jsx";

// Register the necessary components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// More detailed static data organized by course and subject
const subjectAnalyticsData = {
    'MCA': [
        { subject: 'Data Structures', views: 150 },
        { subject: 'Advanced Java', views: 120 },
        { subject: 'Computer Networks', views: 95 },
        { subject: 'AI Concepts', views: 180 },
    ],
    'MTech': [
        { subject: 'Machine Learning', views: 250 },
        { subject: 'Big Data', views: 210 },
        { subject: 'Cloud Computing', views: 190 },
    ],
    'BTech': [
        { subject: 'Discrete Mathematics', views: 110 },
        { subject: 'Operating Systems', views: 130 },
        { subject: 'Compiler Design', views: 80 },
    ],
    'MBA (Tech)': [
        { subject: 'Business Strategy', views: 170 },
        { subject: 'Marketing Analytics', views: 145 },
    ],
};


export default function Analytics() {
    const [selectedCourse, setSelectedCourse] = useState('MCA');

    const chartData = {
        labels: subjectAnalyticsData[selectedCourse].map(d => d.subject),
        datasets: [
            {
                label: "Lecture Views",
                data: subjectAnalyticsData[selectedCourse].map(d => d.views),
                backgroundColor: "rgba(124, 58, 237, 0.6)",
                borderColor: "rgba(124, 58, 237, 1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Lecture Views per Subject for ${selectedCourse}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Panel>
            <div className="panel-header" style={{ marginBottom: '1.5rem' }}>
                <h2>Analytics</h2>
                <div className="form-group">
                    <label htmlFor="course-select">Select Course</label>
                    <select
                        id="course-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {Object.keys(subjectAnalyticsData).map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </Panel>
    );
}

