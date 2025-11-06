import React from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const data = Object.fromEntries(form.entries())
    // placeholder: send data to API or handle it
    // For now we'll just log to console
    console.log('contact submit', data)
    alert('Thanks! Your message was submitted (demo).')
    e.target.reset()
  }

  return (
    <div className="contact-root">
      <div className="back-link">
        <Link to="/home">← Back to Home</Link>
      </div>

      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We're here to help you plan your perfect trip.</p>
      </header>

      <main className="contact-panel">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" required />
          </label>

          <label>
            Email
            <input name="email" type="email" required />
          </label>

          <label>
            Message
            <textarea name="message" rows={6} required />
          </label>

          <button className="submit-btn" type="submit">Submit</button>
        </form>
      </main>
    </div>
  )
}
