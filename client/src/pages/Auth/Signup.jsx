import React, { useState } from 'react';
import './Auth.css'; // Use the common Auth.css file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8001/api/auth/signup", {
        email,
        password,
        username,
      });
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>User Signup</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="input-field"
      />
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
      <button onClick={handleSignup} className="button">Sign up</button>
      <a href="/login" className="auth-link">Already have an account? Login here</a>
    </div>
  );
}
