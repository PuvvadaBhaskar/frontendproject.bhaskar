import React, { useEffect, useState } from 'react'

export default function ManageBookingsAdmin(){
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    try { const raw = localStorage.getItem('bookings'); if (raw) setBookings(JSON.parse(raw)) } catch (err) { void err }
  }, [])

  function updateStatus(id, status){
    const next = bookings.map(b => b.id === id ? { ...b, status } : b)
    setBookings(next)
    try { localStorage.setItem('bookings', JSON.stringify(next)) } catch (err) { void err }
  }

  function remove(id){
    const next = bookings.filter(b => b.id !== id)
    setBookings(next)
    try { localStorage.setItem('bookings', JSON.stringify(next)) } catch (err) { void err }
  }

  return (
    <div>
      <h2>Manage Bookings</h2>
      {bookings.length === 0 ? <div>No bookings</div> : (
        bookings.map(b => (
          <div key={b.id} style={{padding:8, borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div><strong>{b.placeTitle || `Place ${b.placeId}`}</strong> — {b.roomTitle || ''}</div>
              <div style={{fontSize:12, color:'#666'}}>{b.total ? `$${b.total}` : ''} · {new Date(b.ts).toLocaleString()}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              <select value={b.status} onChange={e=>updateStatus(b.id, e.target.value)}>
                <option>Upcoming</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
              <button className="action-btn" onClick={()=>remove(b.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
