import React, { useState, useContext } from "react";
import { authContext } from "../../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const { currentUser, signUp, signOut } = useContext(authContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signUp({ username, email, password });
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="https://images.unsplash.com/photo-1661551428516-cd1b02c11d97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FrZSUyMG1ha2luZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Cake making"
        />
      </div>

      <div className="signup-right">
        <div className="form-box">
          <h2>Create your account</h2>
          <p className="sub-text">Start for free</p>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Continue</button>
          </form>
          <p className="bottom-text">
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
