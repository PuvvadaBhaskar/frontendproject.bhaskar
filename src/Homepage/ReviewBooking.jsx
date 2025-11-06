import React, { useMemo, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cards from './data'
import './Booking.css'

const DEFAULT_ROOMS = [
  { id: 1, title: 'Standard Room', subtitle: 'Standard Double Room', price: 120 },
  { id: 2, title: 'Family Suite', subtitle: 'Spacious suite with two beds', price: 200 }
]

export default function ReviewBooking(){
  const { id, roomId } = useParams()
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const place = cards.find(c => String(c.id) === String(id))

  const room = useMemo(() => {
    const rooms = (place && place.homestays) ? place.homestays : DEFAULT_ROOMS
    return rooms.find(r => String(r.id) === String(roomId)) || DEFAULT_ROOMS[0]
  }, [place, roomId])

  const search = new URLSearchParams(window.location.search)
  const checkin = search.get('checkin') || ''
  const travelers = search.get('travelers') || ''
  const nights = 1

  // Load food order from localStorage
  const [food, setFood] = useState({ items: {}, total: 0 })
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`order:${id}:${roomId}`)
      if (raw) {
        const parsed = JSON.parse(raw)
        setFood({ items: parsed.order || {}, total: parsed.total || 0 })
      }
    } catch { /* ignore */ }
  }, [id, roomId])

  const base = room.price * nights
  const grand = base + (food.total || 0)

  return (
    <div className="booking-page">
      <h1 className="booking-header">Review & Confirm</h1>
      <div className="booking-panel" style={{maxWidth:960}}>
        <div className="booking-image-wrap">
          <div className="booking-image-box">
            <h4 className="small-title">{place ? place.title : 'Selected Place'}</h4>
            <div style={{height:220, backgroundImage:`url(${place?.image})`, backgroundSize:'cover', backgroundPosition:'center', borderRadius:8}} />
          </div>
        </div>

        <div className="booking-info">
          <h2 className="room-title">{room.title}</h2>
          <div className="room-price">${room.price}/night × {nights} night</div>

          {(checkin || travelers) && (
            <div className="booking-context">
              {checkin ? <div>Check-in: <strong>{checkin}</strong></div> : null}
              {travelers ? <div>Travelers: <strong>{travelers}</strong></div> : null}
            </div>
          )}

          <div style={{marginTop:16}}>
            <h3 style={{margin:0}}>Food Items</h3>
            {Object.keys(food.items).length === 0 ? (
              <p style={{margin:'8px 0'}}>No add-ons selected.</p>
            ) : (
              <ul style={{margin:'8px 0', paddingLeft:18}}>
                {Object.entries(food.items).map(([id,count]) => (
                  <li key={id}>Item {id}: ×{count}</li>
                ))}
              </ul>
            )}
            <button
              className="add-food"
              onClick={() => navigate(`/place/${id}/homestays/book/${roomId}/food${window.location.search}`)}
            >Edit Food</button>
          </div>

          <div style={{marginTop:16, background:'rgba(0,0,0,0.15)', padding:12, borderRadius:12}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <span>Room subtotal</span>
              <strong>${base}</strong>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:6}}>
              <span>Food add-ons</span>
              <strong>${food.total || 0}</strong>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:8, borderTop:'1px dashed rgba(0,0,0,0.2)', paddingTop:8}}>
              <span>Total</span>
              <strong>${grand}</strong>
            </div>
          </div>

          <div className="proceed-wrap">
            <button className="proceed-btn" onClick={() => setConfirmOpen(true)}>Book Now</button>
          </div>
        </div>
      </div>

      {confirmOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
          <div style={{background:'#fff', color:'#051418', padding:20, borderRadius:12, width:360, textAlign:'center'}}>
            <h2 style={{marginTop:0}}>Booking Confirmed</h2>
            <p>Your reservation has been confirmed. Total paid: <strong>${grand}</strong></p>
            <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:12}}>
              <button className="proceed-btn" onClick={() => { setConfirmOpen(false); try { localStorage.removeItem(`order:${id}:${roomId}`) } catch { /* ignore */ } navigate('/dashboard') }}>Go to Dashboard</button>
              <button className="add-food" onClick={() => { setConfirmOpen(false) }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
