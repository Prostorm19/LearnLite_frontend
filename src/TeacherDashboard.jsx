import React, { useState } from "react";
import "./TeacherDashboard.css";

// Layout
import NavBar from "./components/layout/NavBar.jsx";

// Features
import UploadContent from "./components/features/upload/UploadContent.jsx";
import Lectures from "./components/features/lectures/Lectures.jsx";
import LectureForm from "./components/features/lectures/LectureForm.jsx";
import Analytics from "./components/features/analytics/Analytics.jsx";
import Assignments from "./components/features/assignments/Assignments.jsx";
import Quiz from "./components/features/quiz/Quiz.jsx";
import Schedule from "./components/features/schedule/Schedule.jsx";
import Settings from "./components/features/settings/Settings.jsx";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("lectures");

  return (
    <div className="dashboard">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-content">
        {activeTab === "upload" && <UploadContent />}
        {activeTab === "lectures" && <Lectures />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "assignments" && <Assignments />}
        {activeTab === "quiz" && <Quiz />}
        {activeTab === "schedule" && <Schedule />}
        {activeTab === "settings" && <Settings />}
        <LectureForm />
      </div>
    </div>
  );
}