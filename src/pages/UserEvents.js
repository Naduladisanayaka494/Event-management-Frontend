import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataEntryNavbar from "./DataEntryNavbar";

const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/events/users/${userId}/events`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEvents();
    } else {
      console.error("No userId found in localStorage.");
      setLoading(false);
    }
  }, [userId]);

  const handleAddAttendees = (event) => {
    navigate(`/register-attendee/${event.id}`, { state: { event } });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div>
        <DataEntryNavbar />
      </div>
      <br />
      <br />
      <br />
      <h1 className="text-center mb-4">User Events</h1>
      {events.length === 0 ? (
        <p className="text-center text-muted">No events found for this user.</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4 mb-4" key={event.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <p className="card-text">{event.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddAttendees(event)}
                  >
                    Add Attendees
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserEvents;
