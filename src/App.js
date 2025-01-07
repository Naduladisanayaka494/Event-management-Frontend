import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EventDashboard from "./pages/EventDashboard";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unautorized";
import UserEvents from "./pages/UserEvents";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import RegisterAttendee from "./pages/RegisterAttendee";


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Event-dashboard"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <EventDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-atendee"
            element={
              <ProtectedRoute requiredRole="DataEntry">
                <UserEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-attendee/:eventId"
            element={
              <ProtectedRoute requiredRole="DataEntry">
                <RegisterAttendee />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
