import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cards from './data'
import './Booking.css'

export default function Booking(){
  const { id, roomId } = useParams()
  const navigate = useNavigate()
  const place = cards.find(c => String(c.id) === String(id))

  const params = new URLSearchParams(window.location.search)
  const q = params.get('q') || ''
  const checkin = params.get('checkin') || ''
  const travelers = params.get('travelers') || ''

  // fallback sample room if none
  const room = {
    id: roomId || 1,
    title: 'Standard Double Room',
    price: 120,
    image: 'https://images.unsplash.com/photo-1505691723518-36a4162b7b36?auto=format&fit=crop&w=800&q=60'
  }

  const placeTitle = place ? place.title : ''

  return (
    <div className="booking-page">
      <h1 className="booking-header">Book Your Room{placeTitle ? ` at ${placeTitle}` : ''}</h1>
      <div className="booking-panel">
        <div className="booking-image-wrap">
          <div className="booking-image-box">
            <h4 className="small-title">Standard Room</h4>
            <img src={room.image} alt={room.title} className="booking-image" />
          </div>
        </div>

        <div className="booking-info">
          <h2 className="room-title">{room.title}</h2>
          <div className="room-price">${room.price}/night</div>

          <button
            className="add-food"
            onClick={() => navigate(`/place/${id}/homestays/book/${room.id}/food${window.location.search}`)}
          >
            Add Food Menu
          </button>

          <div className="proceed-wrap">
            <button
              className="proceed-btn"
              onClick={() => navigate(`/place/${id}/homestays/book/${room.id}/review${window.location.search}`)}
            >
              Proceed to Review
            </button>
          </div>

          {(q || checkin || travelers) && (
            <div className="booking-context">
              {q ? <div>Search: <strong>{q}</strong></div> : null}
              {checkin ? <div>Check-in: <strong>{checkin}</strong></div> : null}
              {travelers ? <div>Travelers: <strong>{travelers}</strong></div> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
