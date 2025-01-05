import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminNavbar from "../pages/AdminDashboard";
import DataEntryNavbar from "../pages/DataEntryNavbar";

const Dashboard = () => {
  const { role } = useContext(AuthContext); // Get role from context

  const userRole = role || localStorage.getItem("role");

  return (
    <div>
      {userRole === "ADMIN" ? <AdminNavbar /> : <DataEntryNavbar />}
      <div className="container mt-5">
        <h1>Welcome to the Dashboard</h1>
        <p>Role: {userRole}</p>
      </div>
    </div>
  );
};

export default Dashboard;
