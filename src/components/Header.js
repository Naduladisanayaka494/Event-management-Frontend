import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-primary text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0">Event Management System</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/events">
                Events
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
};

export default Header;
