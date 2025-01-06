import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaHome, FaLink, FaSignOutAlt } from "react-icons/fa"; 

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-dark text-white shadow-lg">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-primary">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="text-white fw-semibold">
              <FaHome className="me-2" /> Home
            </Nav.Link>
            <Nav.Link href="#link" className="text-white fw-semibold">
              <FaLink className="me-2" /> Link
            </Nav.Link>
            <NavDropdown
              title="Actions"
              id="basic-nav-dropdown"
              className="text-white"
            >
              <NavDropdown.Item href="#action/3.1">Action 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link
              onClick={handleLogout}
              className="btn btn-outline-light text-white d-flex align-items-center"
              style={{ cursor: "pointer" }}
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
