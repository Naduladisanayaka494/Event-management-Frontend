import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const signup = (data) => axios.post(`${API_URL}/auth/signup`, data);
export const fetchEvents = (params) =>
  axios.get(`${API_URL}/events`, { params });
export const createEvent = (data, token) =>
  axios.post(`${API_URL}/events`, data, {
    // headers: { Authorization: `Bearer ${token}` },
  });
export const updateEvent = (id, data, token) =>
  axios.put(`${API_URL}/events/${id}`, data, {
    // headers: { Authorization: `Bearer ${token}` },
  });
export const deleteEvent = (id, token) =>
  axios.delete(`${API_URL}/events/${id}`, {
    // headers: { Authorization: `Bearer ${token}` },
  });
export const assignRole = (eventId, userId, role, token) =>
  axios.post(
    `${API_URL}/events/${eventId}/assign-role`,
    { userId, role },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const registerAttendee = (eventId, data, token) =>
  axios.post(`${API_URL}/events/${eventId}/attendees`, data, {
    // headers: { Authorization: `Bearer ${token}` },
  });
export const fetchAnalytics = (eventId, token) =>
  axios.get(`${API_URL}/events/${eventId}/analytics`, {
    // headers: { Authorization: `Bearer ${token}` },
  });
