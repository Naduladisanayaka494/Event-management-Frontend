import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        }
      );
      const { jwt, userRole, userId } = response.data;

      localStorage.setItem("token", jwt);
      localStorage.setItem("role", userRole);
      localStorage.setItem("userId", userId);

      setAuth({
        token: jwt,
        role: userRole,
        userId: userId,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed");
      navigate("/dashboard");
    }
  };

  return (
    <div className="d-flex vh-100">
      <nav
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{ width: "50%" }}
      >
        <h2 className="mb-4">Event-Manegement-System</h2>
      </nav>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "50%" }}
      >
        <div className="w-75">
          <h2>Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
