import React from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const bookings = [
  { id: 1, place: 'Charminar', status: 'Completed' },
  { id: 2, place: 'Agra', status: 'Upcoming' },
  { id: 3, place: 'Goa', status: 'Upcoming' },
]

export default function Dashboard() {
  return (
    <div className="dashboard-root">
      <header className="dashboard-header">Dash Board</header>

      <div className="dashboard-top">
        <div className="profile">
          <div className="avatar" />
          <div className="profile-info">
            <div className="name">sai</div>
            <div className="email">Sai43@gmail.com</div>
            <button className="edit-btn">Edit profile</button>
          </div>
        </div>

        <div className="actions">
          <Link to="/change-password" className="action-btn">Change password</Link>
          <Link to="/" className="action-btn logout">Logout</Link>
        </div>
      </div>

      <h2 className="booking-title">Booking History</h2>

      <div className="booking-list">
        {bookings.map(b => (
          <div key={b.id} className="booking-item">
            <div className="place">🏠{b.place}</div>
            <div className={`status ${b.status === 'Completed' ? 'done' : 'upcoming'}`}>
              {b.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
