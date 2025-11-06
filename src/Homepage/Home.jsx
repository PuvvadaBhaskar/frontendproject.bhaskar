import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [checkin, setCheckin] = useState('')
  const [travelers, setTravelers] = useState('')

  const handleSearch = (e) => {
    e && e.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('q', destination)
    if (checkin) params.set('checkin', checkin)
    if (travelers) params.set('travelers', travelers)
    navigate(`/explore?${params.toString()}`)
  }

  return (
    <div className="home-hero">
      {/* Top navigation moved to global TopNav component */}

      <div className="hero-card">
        <h2>Find Your Perfect Homestay</h2>
        <p className="subtitle">Explore local insights and unique stays</p>

        <form className="search-row" onSubmit={handleSearch}>
          <input
            className="search-input"
            placeholder="Where are you going"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            className="search-input"
            placeholder="Check-in (YYYY-MM-DD)"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
          />

          <input
            className="search-input"
            placeholder="Travelers"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          />

          <button className="search-btn" type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}

export default Home
