import React, { useEffect, useState } from 'react'

export default function ManageTopics(){
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    try { const raw = localStorage.getItem('topics'); if (raw) setItems(JSON.parse(raw)) } catch (err) { void err }
  }, [])

  function add(){
    const obj = { id: Date.now(), title }
    const next = [obj, ...items]
    setItems(next)
    try { localStorage.setItem('topics', JSON.stringify(next)) } catch (err) { void err }
    setTitle('')
  }

  function remove(id){
    const next = items.filter(i => i.id !== id)
    setItems(next)
    try { localStorage.setItem('topics', JSON.stringify(next)) } catch (err) { void err }
  }

  return (
    <div>
      <h2>Manage Topics</h2>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <input placeholder="Topic title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button className="proceed-btn" onClick={add}>Add Topic</button>
      </div>

      <div>
        {items.map(t => (
          <div key={t.id} style={{display:'flex', justifyContent:'space-between', padding:8, borderBottom:'1px solid #eee'}}>
            <div>{t.title}</div>
            <div><button className="action-btn" onClick={()=>remove(t.id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  )
}
