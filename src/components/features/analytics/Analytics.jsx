import React from "react";
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
import Panel from "../../ui/Panel.jsx";

// Register the necessary components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Analytics() {
    // Static data for our bar chart
    const data = {
        labels: ["MCA", "MTech", "MBA", "MCA B1", "MCA B2"],
        datasets: [
            {
                label: "Lecture Views",
                data: [120, 190, 150, 80, 110],
                backgroundColor: "rgba(124, 58, 237, 0.6)", // A nice purple color
                borderColor: "rgba(124, 58, 237, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Chart configuration options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Lecture Views per Course",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Panel title="Analytics">
            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
                This is a static representation of lecture views.
            </p>
        </Panel>
    );
}