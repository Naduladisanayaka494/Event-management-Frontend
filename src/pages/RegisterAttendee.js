import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import DataEntryNavbar from "./DataEntryNavbar";

const RegisterAttendee = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const event = location.state?.event || {};
  const [attendee, setAttendee] = useState({ name: "", email: "" });
  const [loadingRegister, setLoadingRegister] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendee({ ...attendee, [name]: value });
  };

  const handleRegister = async () => {
    setLoadingRegister(true);
    try {
      await axios.post(
        `http://localhost:8080/api/events/${eventId}/attendees`,
        attendee
      );
      alert("Attendee registered successfully!");
      // Reset the form
      setAttendee({ name: "", email: "" });
    } catch (error) {
      console.error("Error registering attendee:", error);
      alert("Failed to register attendee.");
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="container mt-5">
      <div>
        <DataEntryNavbar />
      </div>
      <br />
      <br />
      <br />
      <h1>Register Attendee for "{event.name}"</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={attendee.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={attendee.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="button"
          className={`btn btn-primary ${loadingRegister ? "disabled" : ""}`}
          onClick={handleRegister}
        >
          {loadingRegister ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterAttendee;
