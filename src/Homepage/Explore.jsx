import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Explore.css'
import cards from './data'

export default function Explore(){
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const q = params.get('q') || ''
  const checkin = params.get('checkin') || ''
  const travelers = params.get('travelers') || ''

  const filtered = q
    ? cards.filter(c => c.title.toLowerCase().includes(q.toLowerCase()))
    : cards

  return (
    <div className="explore-page">
      <div className="explore-header">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Search</button>
        <h1>Explore Nearby Attractions</h1>
        {q ? <p className="explore-sub">Showing results for "{q}"</p> : <p className="explore-sub">Discover the best places to visit during your stay</p>}
        {(checkin || travelers) && (
          <p style={{marginTop:8, color:'#083243'}}>
            {checkin ? `Check-in: ${checkin}` : ''} {checkin && travelers ? ' | ' : ''} {travelers ? `Travelers: ${travelers}` : ''}
          </p>
        )}
      </div>

      <div className="explore-grid">
        {filtered.map(c => {
          const fallback = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60'
          const img = c.image || fallback
          return (
          <article key={c.id} className="card clickable" onClick={() => navigate(`/place/${c.id}`)}>
            <div className="card-media" style={{backgroundImage:`url(${img})`}} />
            <div className="card-body">
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
            </div>
          </article>
          )
        })}
      </div>
    </div>
  )
}
