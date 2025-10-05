import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Chatbot from "./pages/Chatbot";
import { AuthProvider } from "./components/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import EnrollmentList from "./components/EnrollmentList";
import CourseRecommended from "./components/CourseRecommended";
import CourseAll from "./components/CourseAll";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Use the app-container class for the main layout */}
        <div className="app-container">
          <Navbar active="Home" />
          {/* The Routes component goes inside the scrollable content area */}
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/courses"
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                }
              >
                {/* Nested routes within Dashboard */}
                <Route path="enrollment" element={<EnrollmentList />} />
                <Route path="allCourses" element={<CourseAll />} />
                <Route
                  path="recommendedCourses"
                  element={<CourseRecommended />}
                />
              </Route>
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <Chatbot />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App;
