import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import { isAdminEmail } from '../config'

const SignupPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    console.log('Signing up', name, email)
    // Persist user and set session
    try {
      const raw = localStorage.getItem('users')
      const users = raw ? JSON.parse(raw) : []
      const norm = email.toLowerCase()
      const role = isAdminEmail(email) ? 'admin' : 'user'
      const user = { id: Date.now(), name, email: norm, role, ts: Date.now() }
      users.unshift(user)
      try { localStorage.setItem('users', JSON.stringify(users)) } catch (err) { void err }
      try { localStorage.setItem('currentUser', JSON.stringify(user)) } catch (err) { void err }
      // Notify other parts of the app in this tab that users changed
      try { window.dispatchEvent(new CustomEvent('users-updated', { detail: user })) } catch (err) { void err }
      if (role === 'admin') { navigate('/admin'); return }
    } catch (err) { void err }

    navigate('/home')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Create Account</h1>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignupPage
