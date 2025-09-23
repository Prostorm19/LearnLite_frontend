import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./pages/teacher/Layout";
import CourseSelection from "./pages/teacher/CourseSelection";
import Lectures from "./components/features/lectures/Lectures";
import UploadContent from "./components/features/upload/UploadContent";
import Analytics from "./components/features/analytics/Analytics";
import Assignments from "./components/features/assignments/Assignments";
import Quiz from "./components/features/quiz/Quiz";
import Schedule from "./components/features/schedule/Schedule";
import Settings from "./components/features/settings/Settings";
import LectureForm from "./components/features/lectures/LectureForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CourseSelection />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        index: true, // Redirects /dashboard to /dashboard/lectures
        element: <Navigate to="lectures" replace />,
      },
      {
        path: "lectures",
        element: <Lectures />,
      },
      {
        path: "lectures/new",
        element: <LectureForm />,
      },
      {
        path: "upload",
        element: <UploadContent />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "assignments",
        element: <Assignments />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
