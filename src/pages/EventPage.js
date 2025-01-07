import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminNavbar from "./AdminDashboard";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    createdBy: "admin",
    capacity: 0,
    remainingCapacity: 0,
    tags: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); 
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Fetch events and users from API
  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  // Fetch events
  const fetchEvents = () => {
    axios
      .get("http://localhost:8080/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  // Fetch users
  const fetchUsers = () => {
    axios
      .get("http://localhost:8080/api/auth/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setSelectedUser(null);
    setNewEvent({
      name: "",
      description: "",
      date: "",
      location: "",
      createdBy: "admin",
      capacity: 0,
      remainingCapacity: 0,
      tags: "",
    });
  };

  const handleShowModal = (type, event = null) => {
    setModalType(type);
    if (type === "edit" && event) {
      setSelectedEvent(event);
      setNewEvent({
        ...event,
      });
    }
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (modalType === "add") {
      axios
        .post("http://localhost:8080/api/events", newEvent)
        .then(() => {
          fetchEvents();
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error adding event:", error);
        });
    } else if (modalType === "edit" && selectedEvent) {
      axios
        .put(`http://localhost:8080/api/events/${selectedEvent.id}`, newEvent)
        .then(() => {
          fetchEvents();
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error updating event:", error);
        });
    }
  };


  const handleAssignEventToUser = (eventId, userId) => {
    axios
      .post(`http://localhost:8080/api/events/${eventId}/users/${userId}`)
      .then(() => {
        alert("Event assigned to user successfully!");
        setShowAssignModal(false);
      })
      .catch((error) => {
        console.error("Error assigning event:", error);
      });
  };


  const handleDeleteEvent = (id) => {
    axios
      .delete(`http://localhost:8080/api/events/${id}`)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Event Report", 20, 20);
    let y = 30;
    filteredEvents.forEach((event, index) => {
      doc.text(`Event Name: ${event.name}`, 20, y);
      doc.text(`Description: ${event.description}`, 20, y + 10);
      doc.text(`Location: ${event.location}`, 20, y + 20);
      doc.text(`Date: ${event.date}`, 20, y + 30);
      doc.text("---", 20, y + 40);
      y += 50;
    });
    doc.save("event_report.pdf");
  };

  return (
    <div className="container mt-5">
      <div>
        <AdminNavbar />
      </div>
      <br />
      <br />
      <br />
      <h2>Event Management</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Button variant="primary" onClick={() => handleShowModal("add")}>
        Add Event
      </Button>
      <Button variant="secondary" onClick={generatePDF} className="ms-2">
        Download Report (PDF)
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.location}</td>
              <td>{event.date}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowModal("edit", event)}
                  className="me-2"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowAssignModal(true);
                  }}
                  className="ms-2"
                >
                  Assign Event to User
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Event to User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select User</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser ? selectedUser : ""} 
                onChange={(e) => {
                  var userId = e.target.value;
                  setSelectedUser(userId);
                  console.log(userId); 
                }}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              selectedEvent && selectedUser
                ? handleAssignEventToUser(selectedEvent.id, selectedUser)
                : alert("Please select a user")
            }
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add Event" : "Update Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                placeholder="Enter event name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                placeholder="Enter event description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                placeholder="Enter event location"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                value={newEvent.capacity}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, capacity: e.target.value })
                }
                placeholder="Enter event capacity"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.tags}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, tags: e.target.value })
                }
                placeholder="Enter event tags"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEvent}>
            Save Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventManagement;
