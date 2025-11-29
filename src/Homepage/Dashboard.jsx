import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

// Dashboard reads persisted bookings from localStorage (key: 'bookings')
// Each booking is an object added by the ReviewBooking flow.

export default function Dashboard() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bookings')
      if (raw) setBookings(JSON.parse(raw))
      else setBookings([])
    } catch (err) {
      console.error('Failed to load bookings', err)
      setBookings([])
    }
  }, [])

  // Cancel a booking: update state and persist to localStorage
  function cancelBooking(bookingId) {
    const b = bookings.find(x => x.id === bookingId)
    if (!b) return
    const ok = window.confirm(`Cancel booking for "${b.placeTitle || b.place || bookingId}"?`)
    if (!ok) return

    const updated = bookings.map(x => (x.id === bookingId ? { ...x, status: 'Cancelled' } : x))
    setBookings(updated)
    try {
      localStorage.setItem('bookings', JSON.stringify(updated))
    } catch (err) {
      console.error('Failed to persist cancelled booking', err)
    }
  }

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
        {bookings.length === 0 ? (
          <div style={{padding:16}}>No bookings yet. Book a stay to see it here.</div>
        ) : (
          bookings.map(b => (
            <div key={b.id} className="booking-item">
              <div className="place">🏠 {b.placeTitle || b.place || `Place ${b.placeId}`}</div>
              <div className={`status ${b.status === 'Completed' ? 'done' : b.status === 'Cancelled' ? 'cancelled' : 'upcoming'}`}>
                {b.status}
              </div>
              <div style={{marginTop:8, fontSize:12, color:'#064'}}>
                {b.roomTitle ? `${b.roomTitle} · ` : ''}{b.total ? `$${b.total}` : ''}
              </div>
              <div style={{marginTop:8}}>
                {b.status === 'Upcoming' && (
                  <button className="action-btn" onClick={() => cancelBooking(b.id)}>Cancel</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
