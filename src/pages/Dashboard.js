import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AdminNavbar from "../pages/AdminDashboard";
import DataEntryNavbar from "../pages/DataEntryNavbar";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = auth.role || localStorage.getItem("role"); 

    if (!token) {
      navigate("/");
      return;
    }

    if (role === "ADMIN") {
      navigate("/Event-dashboard");
    }
    else if (role === "DataEntry") {
      navigate("/add-atendee");
    }
  }, [auth.role, navigate]);

  

  const userRole = auth.role || localStorage.getItem("role");

  return <div>{userRole === "ADMIN" ? null : <DataEntryNavbar />}</div>;
};

export default Dashboard;
