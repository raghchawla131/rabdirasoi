// src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './AdminLogin.css';

const AdminLogin = ({ setAdminAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/admin-login`, {
        email,
        password,
        userType: 'admin'
      });
      setAdminAuthenticated(true);
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
    </div>
  );
};

export default AdminLogin;
