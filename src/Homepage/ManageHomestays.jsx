import React, { useEffect, useState } from 'react'
import './Booking.css'
import cards from './data'
import { getStoredHomestays } from '../lib/dataService'

export default function ManageHomestays(){
  const [stored, setStored] = useState([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [price, setPrice] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({})

  useEffect(() => {
    try {
      const s = getStoredHomestays()
      setStored(s)
    } catch (err) { void err }
  }, [])

  // Build a unified list: stored homestays + built-in homestays derived from `cards` (places)
  const builtIn = []
  cards.forEach(place => {
    const baseRooms = place.homestays ? place.homestays : []
    baseRooms.forEach(r => {
      builtIn.push({
        id: `built-${place.id}-${r.id}`,
        title: r.title || r.subtitle || r.label || 'Room',
        subtitle: r.subtitle || r.description || '',
        price: r.price || 0,
        placeId: place.id,
        placeTitle: place.title,
        source: 'built-in'
      })
    })
  })

  const storedWithMeta = (stored || []).map(s => ({ ...s, source: 'stored' }))
  const all = [...storedWithMeta, ...builtIn]

  function persist(next){
    try { localStorage.setItem('homestays', JSON.stringify(next)) } catch (err) { void err }
  }

  function add(){
    const obj = { id: Date.now(), title: title || 'Untitled', subtitle, price: Number(price) || 0, placeId: placeId || null }
    const next = [obj, ...stored]
    setStored(next)
    persist(next)
    setTitle(''); setSubtitle(''); setPrice(''); setPlaceId('')
  }

  function remove(id){
    const next = stored.filter(i=>i.id !== id)
    setStored(next)
    persist(next)
  }

  function startEdit(item){
    setEditingId(item.id)
    setEditValues({ title: item.title, subtitle: item.subtitle, price: item.price || 0, placeId: item.placeId || '' })
  }

  function cancelEdit(){ setEditingId(null); setEditValues({}) }

  function saveEdit(id){
    const next = stored.map(s => s.id === id ? { ...s, ...editValues, price: Number(editValues.price) || 0 } : s)
    setStored(next)
    persist(next)
    cancelEdit()
  }

  function importBuilt(item){
    // create a stored editable copy of a built-in homestay
    const obj = { id: Date.now(), title: item.title, subtitle: item.subtitle, price: item.price || 0, placeId: item.placeId }
    const next = [obj, ...stored]
    setStored(next)
    persist(next)
    setEditingId(obj.id)
    setEditValues({ title: obj.title, subtitle: obj.subtitle, price: obj.price, placeId: obj.placeId || '' })
  }

  return (
    <div>
      <h2>Manage Home Stays</h2>

      <div style={{marginTop:8, marginBottom:16}}>
        <div style={{display:'flex', gap:8}}>
          <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input placeholder="Subtitle" value={subtitle} onChange={e=>setSubtitle(e.target.value)} />
          <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
          <select value={placeId} onChange={e=>setPlaceId(e.target.value)}>
            <option value="">No place / Global</option>
            {cards.map(p=> <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <button onClick={add} className="proceed-btn">Add New Homestay</button>
        </div>
      </div>

      <div>
        {all.map(item => (
          <div key={item.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:12, borderRadius:8, border:'1px solid #f0f0f0', marginBottom:12}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{item.title}</div>
              <div style={{color:'#666'}}>{item.subtitle}</div>
              <div style={{marginTop:6, fontSize:14}}>${item.price} · {item.placeTitle || (item.placeId ? `Place ${item.placeId}` : 'Global')}</div>
            </div>
            <div style={{display:'flex', gap:8}}>
              {item.source === 'stored' ? (
                editingId === item.id ? (
                  <>
                    <input style={{width:160}} value={editValues.title} onChange={e=>setEditValues(v=>({ ...v, title: e.target.value }))} />
                    <input style={{width:180}} value={editValues.subtitle} onChange={e=>setEditValues(v=>({ ...v, subtitle: e.target.value }))} />
                    <input style={{width:100}} value={editValues.price} onChange={e=>setEditValues(v=>({ ...v, price: e.target.value }))} />
                    <select value={editValues.placeId} onChange={e=>setEditValues(v=>({ ...v, placeId: e.target.value }))}>
                      <option value="">No place / Global</option>
                      {cards.map(p=> <option key={p.id} value={p.id}>{p.title}</option>)}
                    </select>
                    <button className="proceed-btn" onClick={()=>saveEdit(item.id)}>Save</button>
                    <button className="action-btn" onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="proceed-btn" onClick={()=>startEdit(item)}>Edit</button>
                    <button className="action-btn" onClick={()=>remove(item.id)}>Delete</button>
                  </>
                )
              ) : (
                <>
                  <button className="proceed-btn" onClick={()=>importBuilt(item)}>Import</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
