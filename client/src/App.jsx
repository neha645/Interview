import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import StudentProfile from "./components/StudentProfile";
import InterviewRecord from "./components/InterviewRecord";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard home route */}
        <Route path="/" element={<Dashboard />} />

        {/* Student list based on level */}
        <Route path="/students/level/:level" element={<StudentList />} />

        {/* Student profile based on student ID */}
        <Route path="/student/:stdId" element={<StudentProfile />} />

        {/* Interview records for the student */}
        <Route path="/student/interview/:stdId" element={<InterviewRecord />} />
      </Routes>
    </Router>
  );
}

export default App;
