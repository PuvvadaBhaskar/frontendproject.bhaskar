import React, { useEffect, useState } from 'react'

export default function ManageUsers(){
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    try { const raw = localStorage.getItem('users'); if (raw) setUsers(JSON.parse(raw)) } catch (err) { void err }

    // Update users list when other tabs/windows modify localStorage
    const onStorage = (e) => {
      if (e.key === 'users') {
        try { const raw = e.newValue; const parsed = raw ? JSON.parse(raw) : []; setUsers(parsed) } catch (err) { void err }
      }
    }
    window.addEventListener('storage', onStorage)

    // Also listen for an in-app custom event so signups in the same tab update immediately
    const onUsersUpdated = (e) => {
      try { const raw = localStorage.getItem('users'); const parsed = raw ? JSON.parse(raw) : []; setUsers(parsed) } catch (err) { void err }
    }
    window.addEventListener('users-updated', onUsersUpdated)

    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('users-updated', onUsersUpdated)
    }
  }, [])

  function persist(next){
    try { localStorage.setItem('users', JSON.stringify(next)) } catch (err) { void err }
  }

  function registerUser(){
    if (!name || !email) return
    const user = { id: Date.now(), name, email, password: password || '', role: 'user', ts: Date.now() }
    const next = [user, ...users]
    setUsers(next)
    persist(next)
    setName(''); setEmail(''); setPassword('')
  }

  function removeUser(id){
    const next = users.filter(u => u.id !== id)
    setUsers(next)
    persist(next)
  }

  const tourists = users.filter(u => u.role === 'user')

  return (
    <div>
      <h2>Register New Tourist</h2>

      <div style={{marginTop:12}}>
        <input placeholder="Tourist Full Name" value={name} onChange={e=>setName(e.target.value)} style={{display:'block', width:'100%', marginBottom:10}} />
        <input placeholder="Tourist Email" value={email} onChange={e=>setEmail(e.target.value)} style={{display:'block', width:'100%', marginBottom:10}} />
        <input placeholder="Set Initial Password" value={password} onChange={e=>setPassword(e.target.value)} style={{display:'block', width:'100%', marginBottom:12}} />
        <button className="proceed-btn" onClick={registerUser} style={{width:'100%'}}>Register Tourist</button>
      </div>

      <h3 style={{marginTop:22}}>Existing Tourist Accounts</h3>
      {tourists.length === 0 ? (
        <div style={{marginTop:8}}>No tourist accounts</div>
      ) : (
        <div style={{marginTop:8}}>
          {tourists.map(u => (
            <div key={u.id} style={{padding:6}}>
              {u.name || 'Tourist'} - {u.email}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
