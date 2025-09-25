import React from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

export default function Schedule() {
    // Static data for the weekly schedule - only DSA classes
    const scheduleData = {
        Monday: [
            { time: "10:00 AM", course: "MCA", subject: "DSA - Arrays & Strings" },
            { time: "02:00 PM", course: "MCA", subject: "DSA - Linked Lists" },
        ],
        Tuesday: [
            { time: "11:00 AM", course: "MCA", subject: "DSA - Stacks & Queues" },
        ],
        Wednesday: [
            { time: "10:00 AM", course: "MCA", subject: "DSA - Trees" },
            { time: "03:00 PM", course: "MCA", subject: "DSA - Lab Session" },
        ],
        Thursday: [
            { time: "09:00 AM", course: "MCA", subject: "DSA - Graphs" },
            { time: "11:00 AM", course: "MCA", subject: "DSA - Dynamic Programming" },
        ],
        Friday: [
            { time: "10:00 AM", course: "MCA", subject: "DSA - Sorting Algorithms" },
            { time: "02:00 PM", course: "MCA", subject: "DSA - Searching Algorithms" },
        ],
    };

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    // Get all unique time slots from the schedule data and sort them
    const timeSlots = Array.from(
        new Set(Object.values(scheduleData).flat().map(item => item.time))
    ).sort();

    return (
        <Panel>
            <div className="panel-header">
                <h2>Weekly Schedule</h2>
                <Button className="primary">Schedule a new class</Button>
            </div>
            <div className="timetable-container">
                <table className="timetable">
                    <thead>
                        <tr>
                            <th>Time</th>
                            {days.map((day) => (
                                <th key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time) => (
                            <tr key={time}>
                                <td>{time}</td>
                                {days.map((day) => {
                                    const event = scheduleData[day]?.find(e => e.time === time);
                                    return (
                                        <td key={day}>
                                            {event ? (
                                                <div className="timetable-event">
                                                    <div className="event-subject">{event.subject}</div>
                                                    <div className="event-course">{event.course}</div>
                                                </div>
                                            ) : null}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Panel>
    );
}