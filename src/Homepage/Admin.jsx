import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import './Admin.css'
import ManageHomestays from './ManageHomestays'
import AddGuides from './AddGuides'
import AddSpots from './AddSpots'
import ManageBookingsAdmin from './ManageBookingsAdmin'
import ManageUsers from './ManageUsers'

export default function Admin() {
  const [active, setActive] = useState('users')

  function renderActive(){
    switch(active){
      case 'homestays': return <ManageHomestays />
      case 'guides': return <AddGuides />
      case 'spots': return <AddSpots />
      case 'bookings': return <ManageBookingsAdmin />
      case 'users':
      default: return <ManageUsers />
    }
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="brand">Platform Admin</div>
        <nav>
          <button className="nav-link" onClick={()=>setActive('users')}>Manage Users</button>
          <hr style={{borderColor:'rgba(255,255,255,0.06)', margin:'12px 0'}} />
          <button className="nav-link" onClick={()=>setActive('homestays')}>Manage Home Stays</button>
          <button className="nav-link" onClick={()=>setActive('guides')}>Manage Guides</button>
          <button className="nav-link" onClick={()=>setActive('spots')}>Manage Spots</button>
          <button className="nav-link" onClick={()=>setActive('bookings')}>Manage Bookings</button>
        </nav>
      </aside>

      <main className="admin-main">
        <h1 className="page-title">Platform Administration</h1>
        <div className="page-sub">Central control panel for managing users and content.</div>

        <div className="admin-card">
          <div className="admin-panel">
            {renderActive()}
          </div>
        </div>
      </main>
    </div>
  )
}
