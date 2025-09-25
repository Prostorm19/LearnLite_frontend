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

// --- Static Data for Different Charts ---

// 1. Data for Lecture Views
const lectureViewsData = {
    'MCA': [{ subject: 'Arrays', value: 150 }, { subject: 'Linked Lists', value: 120 }, { subject: 'Trees', value: 180 }],
    'MTech': [{ subject: 'Machine Learning', value: 250 }, { subject: 'Big Data', value: 210 }],
};

// 2. Data for Assignment Submissions
const assignmentSubmissionsData = {
    'MCA': [{ subject: 'Arrays', value: 35 }, { subject: 'Linked Lists', value: 40 }, { subject: 'Trees', value: 30 }],
    'MTech': [{ subject: 'Machine Learning', value: 22 }, { subject: 'Big Data', value: 18 }],
};

// 3. Data for Quiz Scores (as average percentage)
const quizScoresData = {
    'MCA': [{ subject: 'Arrays', value: 78 }, { subject: 'Linked Lists', value: 85 }, { subject: 'Trees', value: 72 }],
    'MTech': [{ subject: 'Machine Learning', value: 90 }, { subject: 'Big Data', value: 81 }],
};

// --- Main Analytics Component ---

export default function Analytics() {
    const [chartType, setChartType] = useState('lectureViews'); // Default chart
    const [selectedCourse, setSelectedCourse] = useState('MCA'); // Default course

    // A helper function to get the correct data and configuration based on the selected chart type
    const getChartData = () => {
        let data, label, title, backgroundColor, borderColor;

        switch (chartType) {
            case 'assignments':
                data = assignmentSubmissionsData[selectedCourse];
                label = "Assignments Submitted";
                title = `Assignments Submitted per Subject for ${selectedCourse}`;
                backgroundColor = "rgba(22, 163, 74, 0.6)";
                borderColor = "rgba(22, 163, 74, 1)";
                break;
            case 'quizScores':
                data = quizScoresData[selectedCourse];
                label = "Average Quiz Score (%)";
                title = `Average Quiz Scores per Subject for ${selectedCourse}`;
                backgroundColor = "rgba(219, 39, 119, 0.6)";
                borderColor = "rgba(219, 39, 119, 1)";
                break;
            case 'lectureViews':
            default:
                data = lectureViewsData[selectedCourse];
                label = "Lecture Views";
                title = `Lecture Views per Subject for ${selectedCourse}`;
                backgroundColor = "rgba(124, 58, 237, 0.6)";
                borderColor = "rgba(124, 58, 237, 1)";
                break;
        }

        return {
            chartData: {
                labels: data.map(d => d.subject),
                datasets: [{
                    label: label,
                    data: data.map(d => d.value),
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                }],
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: title },
                },
                scales: {
                    y: { beginAtZero: true },
                },
            },
        };
    };

    const { chartData, chartOptions } = getChartData();
    const availableCourses = Object.keys(lectureViewsData); // Assuming all data types have the same courses

    return (
        <Panel>
            <div className="panel-header" style={{ marginBottom: '1.5rem', gap: '1rem' }}>
                <h2>Analytics</h2>
                <div className="form-group">
                    <label htmlFor="chart-type-select">Select Metric</label>
                    <select
                        id="chart-type-select"
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value)}
                    >
                        <option value="lectureViews">Views per Lecture</option>
                        <option value="assignments">Assignments Submitted</option>
                        <option value="quizScores">Quiz Scores</option>
                    </select>
                </div>

            </div>
            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </Panel>
    );
}
