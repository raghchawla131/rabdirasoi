import React, { useContext, useState } from 'react';
import './Auth.css'; // Use the common Auth.css file
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

export default function Signup() {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const {signup} = useContext(AuthContext);

  const handleChange = (e) => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      signup(authData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>User Signup</h2>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        placeholder="Username"
        className="input-field"
      />
      <input
        type="text"
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleSignup} className="button">Sign up</button>
      <a href="/login" className="auth-link">Already have an account? Login here</a>
    </div>
  );
}
