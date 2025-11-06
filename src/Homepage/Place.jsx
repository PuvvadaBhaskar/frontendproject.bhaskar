import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import cards from './data'
import './Explore.css'

export default function Place(){
  const { id } = useParams()
  const navigate = useNavigate()
  const place = cards.find(c => String(c.id) === String(id))
  // read optional query params (e.g., from search)
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q') || ''
  const checkin = params.get('checkin') || ''
  const travelers = params.get('travelers') || ''

  if (!place) return (
    <div style={{padding:24}}>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>Place not found</h2>
    </div>
  )

  return (
    <div className="explore-page">
      <div style={{padding:'1rem 2rem'}}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Attractions</button>
      </div>

      <div style={{maxWidth:1100, margin:'0 auto', padding:'1rem'}}>
        {(q || checkin || travelers) && (
          <div style={{marginBottom:12, color:'#03202a'}}>
            {q ? <span style={{marginRight:12}}>Search: <strong>{q}</strong></span> : null}
            {checkin ? <span style={{marginRight:12}}>Check-in: <strong>{checkin}</strong></span> : null}
            {travelers ? <span>Travelers: <strong>{travelers}</strong></span> : null}
          </div>
        )}
        <div style={{display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap'}}>
          <div style={{flex:'1 1 380px'}}>
            <div style={{height:380, backgroundImage:`url(${place.image})`, backgroundSize:'cover', backgroundPosition:'center', borderRadius:8}} />
          </div>
          <div style={{flex:'1 1 420px'}}>
            <h1 style={{marginTop:0}}>{place.title}</h1>
            <p style={{fontWeight:700}}>{place.subtitle}</p>
            <p style={{marginTop:12}}>{place.description}</p>

            <h3 style={{marginTop:18}}>Available Transport</h3>
            <ul>
              <li>Cab — Approx. 15 mins ride</li>
              <li>Local bus — Approx. 30 mins ride</li>
              <li>Local Tuk-tuk — Short distances</li>
            </ul>

            <h3>Available Guides</h3>
            <div style={{display:'flex', gap:12, marginTop:8}}>
              <div style={{background:'rgba(0,0,0,0.06)', padding:12, borderRadius:8}}>John Doe<br/><small>Historic tours</small></div>
              <div style={{background:'rgba(0,0,0,0.06)', padding:12, borderRadius:8}}>Sunny<br/><small>Nature & trails</small></div>
            </div>

          </div>
        </div>

        <h3 style={{marginTop:28, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span>Available Home Stays</span>
          <button
            onClick={() => navigate(`/place/${id}/homestays${window.location.search}`)}
            style={{background:'#bfe0d5', border:0, padding:'8px 12px', borderRadius:10, cursor:'pointer'}}
          >
            View Home Stays
          </button>
        </h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:16, marginTop:12}}>
          {(place.gallery || [
            'https://images.unsplash.com/photo-1505691723518-36a4162b7b36?auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1560184897-6c6f7d3d0d8a?auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60',
            'https://images.unsplash.com/photo-1542317854-6e3b77f9b5c0?auto=format&fit=crop&w=800&q=60'
          ]).map((img, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/place/${id}/homestays${window.location.search}`)}
              style={{height:160, backgroundImage:`url(${img})`, backgroundSize:'cover', backgroundPosition:'center', cursor:'pointer', borderRadius:8}}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
