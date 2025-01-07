import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AdminNavbar from "../pages/AdminDashboard";
import DataEntryNavbar from "../pages/DataEntryNavbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const { role } = useContext(AuthContext); // Get role from context
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login page if no token exists
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const userRole = role || localStorage.getItem("role");

  return (
    <div>
      {userRole === "ADMIN" ? <AdminNavbar /> : <DataEntryNavbar />}
    
    </div>
  );
};

export default Dashboard;
