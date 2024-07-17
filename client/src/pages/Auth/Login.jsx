import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const data = {
    email,
    password,
  };

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:8001/api/auth/login", data, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>User Login</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleLogin} className="button">
        Login
      </button>
      <a href="/signup" className="auth-link">
        New user? Sign up here
      </a>
    </div>
  );
}
