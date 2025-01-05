import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {

    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    setRole(token ? userRole : ""); 
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (role === "ADMIN") {
    return (
      <header className="bg-primary text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">Admin Dashboard</h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin-dashboard">
                  Admin Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/manage-users">
                  Manage Users
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  } else if (role === "DataEntry") {
    return (
      <header className="bg-secondary text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">Data Entry Dashboard</h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/data-entry-dashboard"
                >
                  Data Entry Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/submit-data">
                  Submit Data
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  } else {
    return (
      <header className="bg-light text-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">Employee Management System</h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
};

export default Header;
