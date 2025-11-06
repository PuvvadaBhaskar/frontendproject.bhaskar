import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    
    navigate('/home')
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="nav-links">
          <span className="active">Login</span>
          <Link to="/signup">Sign Up</Link>
        </div>

        <h1>Welcome<br />Back</h1>
        <p>Sign in to continue your journey.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
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

          <button type="submit">Login</button>
        </form>

        <Link to="/home" className="guest-link">
          Continue as Guest
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;