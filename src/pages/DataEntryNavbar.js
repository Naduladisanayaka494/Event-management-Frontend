import React from "react";
import { Link } from "react-router-dom";

const DataEntryNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dataentry-dashboard">
          Data Entry Dashboard
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/enter-data">
                Enter Data
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/view-entries">
                View Entries
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DataEntryNavbar;
