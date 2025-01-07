import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Container, Row, Col, Form } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AdminNavbar from "./AdminDashboard";

function EventDashboard() {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    tags: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events", {
        params: filters,
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchAttendees = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/events/${eventId}/attendees`
      );
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const fetchAnalytics = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/events/${eventId}/analytics`
      );
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  const fetchUserEvents = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/events/users/${userId}/events`
      );
      setUserEvents(response.data);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  const exportToPDF = () => {
    const input = document.getElementById("dashboard-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("EventDashboard.pdf");
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    fetchEvents();
  };

    return (
      <Container id="dashboard-content" className="mt-4">
        <div>
          <AdminNavbar />
            </div>
            <br /><br /><br />
            
            
        <Row className="mb-3">
          <Col>
            <h2>Event Dashboard</h2>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={exportToPDF}>
              Export to PDF
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col md={3}>
            <Form.Control
              type="date"
              name="date"
              value={filters.date}
              onChange={handleInputChange}
              placeholder="Date"
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              placeholder="Location"
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              name="tags"
              value={filters.tags}
              onChange={handleInputChange}
              placeholder="Tags"
            />
          </Col>
          <Col md={3}>
            <Button variant="success" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>

        {/* Events */}
        <h3>All Events</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => fetchAttendees(event.id)}
                    className="me-2"
                  >
                    View Attendees
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => fetchAnalytics(event.id)}
                  >
                    View Analytics
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Attendees */}
        {attendees.length > 0 && (
          <>
            <h3>Attendees</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee) => (
                  <tr key={attendee.id}>
                    <td>{attendee.id}</td>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Analytics */}
        {analytics && (
          <>
            <h3>Event Analytics</h3>
            <pre>{JSON.stringify(analytics, null, 2)}</pre>
          </>
        )}

        {/* User Events */}
        {userEvents.length > 0 && (
          <>
            <h3>Events for User</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    );
}

export default EventDashboard;
