import React, { useEffect, useState } from 'react'

export default function AddSpots(){
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(() => {
    try { const raw = localStorage.getItem('spots'); if (raw) setItems(JSON.parse(raw)) } catch (err) { void err }
  }, [])

  function add(){
    const obj = { id: Date.now(), title, desc }
    const next = [obj, ...items]
    setItems(next)
    try { localStorage.setItem('spots', JSON.stringify(next)) } catch (err) { void err }
    setTitle(''); setDesc('')
  }

  function remove(id){
    const next = items.filter(i=>i.id !== id)
    setItems(next)
    try { localStorage.setItem('spots', JSON.stringify(next)) } catch (err) { void err }
  }

  return (
    <div>
      <h2>Add Tourism Spots</h2>
      <div style={{display:'flex', gap:8}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Short description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <button className="proceed-btn" onClick={add}>Add</button>
      </div>

      <div style={{marginTop:12}}>
        {items.map(i=> (
          <div key={i.id} style={{display:'flex', justifyContent:'space-between', padding:8, borderBottom:'1px solid #eee'}}>
            <div>{i.title} · {i.desc}</div>
            <div><button className="action-btn" onClick={()=>remove(i.id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
