import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Proceedings(){
  const [search] = useSearchParams()
  const placeId = search.get('placeId') || ''
  const roomId = search.get('roomId') || ''
  const total = search.get('total') || ''

  return (
    <div style={{padding:20}}>
      <h1>Proceedings</h1>
      <p>This is the proceedings page. It has not been modified by the QR change.</p>
      <div style={{marginTop:12}}>
        <div><strong>Place ID:</strong> {placeId}</div>
        <div><strong>Room ID:</strong> {roomId}</div>
        <div><strong>Total:</strong> {total}</div>
      </div>
    </div>
  )
}
