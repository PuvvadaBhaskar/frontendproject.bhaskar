import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { ADMIN_EMAILS, isAdminEmail } from '../config'
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    const isAdmin = isAdminEmail(email)
    if (isAdmin) { navigate('/admin'); return }
    // persist simple session and users list
    try {
      const raw = localStorage.getItem('users')
      const users = raw ? JSON.parse(raw) : []
      const norm = email.toLowerCase()
      let existing = users.find(u => u.email === norm)
      if (!existing) {
        const role = isAdminEmail(email) ? 'admin' : 'user'
        existing = { id: Date.now(), email: norm, name: '', role, ts: Date.now() }
        users.unshift(existing)
        try { localStorage.setItem('users', JSON.stringify(users)) } catch (err) { void err }
      }
      try { localStorage.setItem('currentUser', JSON.stringify(existing)) } catch (err) { void err }
    } catch (err) { void err }

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