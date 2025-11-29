import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './TopNav.css'

export default function TopNav() {
  const [locLabel, setLocLabel] = useState('Use my location')
  const [loading, setLoading] = useState(false)

  const handleLocate = async () => {
    if (!('geolocation' in navigator)) {
      setLocLabel('Geolocation not supported')
      return
    }
    try {
      setLoading(true)
      setLocLabel('Detecting…')

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000,
        })
      })

      const { latitude, longitude } = position.coords

      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
      if (!res.ok) throw new Error('Reverse geocoding failed')
      const data = await res.json()

      const addr = data.address || {}
      const city = addr.city || addr.town || addr.village || addr.hamlet
      const state = addr.state
      const country = addr.country
 
      const pretty = [city, state, country].filter(Boolean).join(', ')
      setLocLabel(pretty || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
    } catch (err) {
      console.error('Locate error', err)
      if (err && err.code === 1) {
        setLocLabel('Location permission denied')
      } else if (err && err.code === 3) {
        setLocLabel('Location timed out')
      } else {
        setLocLabel('Unable to fetch location')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="top-header">
      <div className="brand">HOME STAY CONNECT</div>
      <nav className="top-nav">
        <Link to="/home">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/dashboard">Bookings</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <button className="location" onClick={handleLocate} disabled={loading} title="Detect my location">
        {locLabel}
      </button>
    </header>
  )
}
