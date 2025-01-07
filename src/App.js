import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EventDashboard from "./pages/EventDashboard";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unautorized";

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
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
