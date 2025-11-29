import React, { useEffect, useState } from 'react'

export default function AddGuides(){
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    try { const raw = localStorage.getItem('guides'); if (raw) setItems(JSON.parse(raw)) } catch (err) { void err }
  }, [])

  function add(){
    const obj = { id: Date.now(), name, phone }
    const next = [obj, ...items]
    setItems(next)
    try { localStorage.setItem('guides', JSON.stringify(next)) } catch (err) { void err }
    setName(''); setPhone('')
    // also add to users list as role 'guide' so admins can view guides in users
    try {
      const raw = localStorage.getItem('users')
      const users = raw ? JSON.parse(raw) : []
      const user = { id: Date.now() + 1, name, email: `${name.replace(/\s+/g, '').toLowerCase()}@guide.local`, role: 'guide', ts: Date.now() }
      users.unshift(user)
      try { localStorage.setItem('users', JSON.stringify(users)) } catch (err) { void err }
    } catch (err) { void err }
  }

  function remove(id){
    const next = items.filter(i=>i.id !== id)
    setItems(next)
    try { localStorage.setItem('guides', JSON.stringify(next)) } catch (err) { void err }
  }

  return (
    <div>
      <h2>Add Guides</h2>
      <div style={{display:'flex', gap:8}}>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <button className="proceed-btn" onClick={add}>Add</button>
      </div>

      <div style={{marginTop:12}}>
        {items.map(i=> (
          <div key={i.id} style={{display:'flex', justifyContent:'space-between', padding:8, borderBottom:'1px solid #eee'}}>
            <div>{i.name} · {i.phone}</div>
            <div><button className="action-btn" onClick={()=>remove(i.id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
