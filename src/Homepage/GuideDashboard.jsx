import React from 'react'
import './Dashboard.css'

export default function GuideDashboard(){
  return (
    <div className="dashboard-root">
      <header className="dashboard-header">Guide Dashboard</header>

      <div style={{padding:12}}>
        <p>Welcome, guide. Use this dashboard to view assignments, manage your schedule, and see bookings assigned to you.</p>
        <div style={{display:'flex', gap:8}}>
          <button className="action-btn">My Assignments</button>
          <button className="action-btn">Assigned Bookings</button>
          <button className="action-btn">Profile</button>
        </div>
      </div>
    </div>
  )
}
