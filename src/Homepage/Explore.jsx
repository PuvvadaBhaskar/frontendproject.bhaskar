import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Explore.css'
import cards from './data'
import { getStoredSpots } from '../lib/dataService'

export default function Explore() {
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const q = params.get('q') || ''
  const checkin = params.get('checkin') || ''
  const travelers = params.get('travelers') || ''

  const storedSpots = getStoredSpots().map((s, idx) => ({
    id: `spot-${s.id || idx}`,
    title: s.title || s.name || 'Spot',
    subtitle: s.desc || '',
    image: s.image || ''
  }))

  const allCards = [...cards, ...storedSpots]

  const filtered = q
    ? allCards.filter(c =>
        c.title.toLowerCase().includes(q.toLowerCase())
      )
    : allCards

  // FIXED: 12 guaranteed working images
  const randomImages = [
    "https://picsum.photos/seed/boat/1200/800",
    "https://picsum.photos/seed/city/1200/800",
    "https://picsum.photos/seed/desert/1200/800",
    "https://picsum.photos/seed/food/1200/800",
    "https://picsum.photos/seed/goa/1200/800",
    "https://picsum.photos/seed/green/1200/800",
    "https://picsum.photos/seed/island/1200/800",
    "https://picsum.photos/seed/lighthouse/1200/800",
    "https://picsum.photos/seed/mountain/1200/800",
    "https://picsum.photos/seed/tajmahal/1200/800",
    "https://picsum.photos/seed/temple/1200/800",
    "https://picsum.photos/seed/waterfall/1200/800"
  ]

  return (
    <div className="explore-page">
      <div className="explore-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Search
        </button>

        <h1>Explore Nearby Attractions</h1>

        {q ? (
          <p className="explore-sub">Showing results for "{q}"</p>
        ) : (
          <p className="explore-sub">
            Discover the best places to visit during your stay
          </p>
        )}

        {(checkin || travelers) && (
          <p style={{ marginTop: 8, color: '#083243' }}>
            {checkin ? `Check-in: ${checkin}` : ''}{' '}
            {checkin && travelers ? ' | ' : ''}{' '}
            {travelers ? `Travelers: ${travelers}` : ''}
          </p>
        )}
      </div>

      <div className="explore-grid">
        {filtered.map((c, index) => {
          const img = c.image?.trim()
            ? c.image
            : randomImages[index % randomImages.length]

          return (
            <article
              key={c.id}
              className="card clickable"
              onClick={() => navigate(`/place/${c.id}`)}
            >
              <div
                className="card-media"
                style={{ backgroundImage: `url(${img})` }}
              />
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
