import React from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

export default function Schedule() {
    // Static data for the weekly schedule
    const scheduleData = {
        Monday: [
            { time: "10:00 AM", course: "MCA", subject: "Data Structures" },
            { time: "02:00 PM", course: "MTech", subject: "Advanced Algorithms" },
        ],
        Tuesday: [
            { time: "11:00 AM", course: "MBA (Tech)", subject: "Business Strategy" },
        ],
        Wednesday: [
            { time: "10:00 AM", course: "MCA", subject: "Data Structures" },
            { time: "03:00 PM", course: "MCA B1", subject: "Lab Session" },
        ],
        Thursday: [
            { time: "09:00 AM", course: "MTech", subject: "Machine Learning" },
            { time: "11:00 AM", course: "MBA (Tech)", subject: "Marketing Analytics" },
        ],
        Friday: [
            { time: "10:00 AM", course: "MCA", subject: "Database Systems" },
            { time: "02:00 PM", course: "MTech", subject: "Advanced Algorithms" },
        ],
    };

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    return (
        <Panel>
            <div className="panel-header">
                <h2>Weekly Schedule</h2>
                <Button className="primary">Schedule a new class</Button>
            </div>
            <div className="schedule-grid">
                {days.map((day) => (
                    <div key={day} className="schedule-day">
                        <h3>{day}</h3>
                        <div className="day-events">
                            {scheduleData[day] ? (
                                scheduleData[day].map((event, index) => (
                                    <div key={index} className="schedule-event">
                                        <div className="event-time">{event.time}</div>
                                        <div className="event-details">
                                            <div className="event-subject">{event.subject}</div>
                                            <div className="event-course">{event.course}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-events">No classes scheduled</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}