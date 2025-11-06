import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cards from './data'
import './Homestays.css'

export default function Homestays(){
  const { id } = useParams()
  const navigate = useNavigate()
  const place = cards.find(c => String(c.id) === String(id))
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q') || ''
  const checkin = params.get('checkin') || ''
  const travelers = params.get('travelers') || ''

  // sample rooms — prefer place.homestays if provided by data
  const rooms = place && place.homestays ? place.homestays : [
    {
      id: 1,
      title: 'Standard Room',
      subtitle: 'Standard Double Room',
      description: 'A cozy room for two with a beautiful view.',
      rating: 4.2,
      reviews: 85,
      price: 120,
      label: 'Standard Room'
    },
    {
      id: 2,
      title: 'Family Suite',
      subtitle: 'Spacious suite with two beds',
      description: 'Spacious suite with two beds, perfect for families.',
      rating: 4.9,
      reviews: 45,
      price: 200,
      label: 'Family Suite'
    }
  ]

  if (!place) return (
    <div style={{padding:24}}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>Place not found</h2>
    </div>
  )

  return (
    <div className="homestays-page">
      <div className="homestays-top">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Attraction</button>
        <h1 className="homestays-title">{place.title}</h1>
        <div className="homestays-sub">
          <span className="stars">★★★★★</span>
          <span className="rating">{place.rating || 4.5}</span>
        </div>
        <p className="homestays-desc">{place.description}</p>
        {(q || checkin || travelers) && (
          <div className="search-context">
            {q ? <span>Search: <strong>{q}</strong></span> : null}
            {checkin ? <span>Check-in: <strong>{checkin}</strong></span> : null}
            {travelers ? <span>Travelers: <strong>{travelers}</strong></span> : null}
          </div>
        )}
      </div>

      <div className="homestays-list">
        <h3>Available Rooms</h3>
        {rooms.map(r => (
          <div key={r.id} className="room-card">
            <div className="room-label">
              <div className="room-label-inner">{r.label}</div>
            </div>
            <div className="room-details">
              <h4>{r.subtitle}</h4>
              <p className="room-desc">{r.description}</p>
              <div className="room-meta">★★★★☆ {r.rating} ({r.reviews} reviews)</div>
              <div className="room-price">${r.price}/night</div>
            </div>
            <div className="room-action">
              <button
                className="book-btn"
                onClick={() => navigate(`/place/${id}/homestays/book/${r.id}${window.location.search}`)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
