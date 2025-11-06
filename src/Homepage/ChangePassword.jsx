import React, { useState } from 'react'
import './ChangePassword.css'

export default function ChangePassword(){
  const [show, setShow] = useState({ current:false, next:false, confirm:false })

  const [form, setForm] = useState({ current:'', next:'', confirm:'' })
  const [message, setMessage] = useState('')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  function handleSubmit(e){
    e.preventDefault()
    setMessage('')
    if (!form.current || !form.next || !form.confirm) {
      setMessage('Please fill all fields.')
      return
    }
    if (form.next.length < 6) {
      setMessage('New password must be at least 6 characters.')
      return
    }
    if (form.next !== form.confirm) {
      setMessage('Passwords do not match.')
      return
    }
    // Demo only: in real app call API here
    setMessage('Password changed successfully (demo).')
    setForm({ current:'', next:'', confirm:'' })
  }

  return (
    <div className="changepw-root">
      <div className="changepw-card">
        <div className="changepw-visual" role="img" aria-label="Security illustration" />

        <form className="changepw-form" onSubmit={handleSubmit}>
          <h1>Change Password</h1>
          <p className="sub">Keep your account secure by choosing a strong password.</p>

          <label>
            Current password
            <div className="pw-field">
              <input name="current" type={show.current? 'text':'password'} value={form.current} onChange={onChange} />
              <button type="button" className="toggle" onClick={()=>setShow(s=>({...s,current:!s.current}))}>{show.current? 'Hide':'Show'}</button>
            </div>
          </label>

          <label>
            New password
            <div className="pw-field">
              <input name="next" type={show.next? 'text':'password'} value={form.next} onChange={onChange} />
              <button type="button" className="toggle" onClick={()=>setShow(s=>({...s,next:!s.next}))}>{show.next? 'Hide':'Show'}</button>
            </div>
          </label>

          <label>
            Confirm new password
            <div className="pw-field">
              <input name="confirm" type={show.confirm? 'text':'password'} value={form.confirm} onChange={onChange} />
              <button type="button" className="toggle" onClick={()=>setShow(s=>({...s,confirm:!s.confirm}))}>{show.confirm? 'Hide':'Show'}</button>
            </div>
          </label>

          {message && <div className="msg">{message}</div>}

          <div className="actions">
            <button className="save" type="submit">Save Password</button>
          </div>
        </form>
      </div>
    </div>
  )
}
