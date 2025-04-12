import React, { useContext, useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function Login() {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleChange = (e) => {
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(authData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>User Login</h2>
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
      <button onClick={handleLogin} className="button">
        Login
      </button>
      <a href="/signup" className="auth-link">
        New user? Sign up here
      </a>
    </div>
  );
}
