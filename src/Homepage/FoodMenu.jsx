import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './FoodMenu.css'

const MENU = {
  indian: [
    { id: 'i1', title: 'Butter Chicken', desc: 'Rich and creamy tomato-based curry.', price: 15, rating: 4.8 },
    { id: 'i2', title: 'Dal Makhani', desc: 'Slow-cooked black lentils in a buttery sauce.', price: 12, rating: 4.5 },
    { id: 'i3', title: 'Paneer Tikka Masala', desc: 'Marinated cottage cheese in a spicy curry.', price: 14, rating: 4.7 }
  ],
  chines: [
    { id: 'c1', title: 'Veg Chow Mein', desc: 'Stir-fried noodles with vegetables.', price: 10, rating: 4.3 },
    { id: 'c2', title: 'Sweet & Sour Tofu', desc: 'Crispy tofu in tangy sauce.', price: 13, rating: 4.4 }
  ]
}

export default function FoodMenu() {
  const { id, roomId } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState('indian')
  const [order, setOrder] = useState({})

  const _placeId = id || ''
  const _roomId = roomId || ''

  function addItem(item) {
    setOrder(prev => {
      const copy = { ...prev }
      copy[item.id] = (copy[item.id] || 0) + 1
      return copy
    })
  }

  function total() {
    let sum = 0
    Object.keys(order).forEach(key => {
      const item = Object.values(MENU).flat().find(i => i.id === key)
      if (item) sum += item.price * order[key]
    })
    return sum
  }

  return (
    <div className="foodmenu-page">
      <div className="foodmenu-panel">
        <h1 className="foodmenu-title">Add-On Food Menu</h1>

        <div className="foodmenu-cats">
          <button
            className={category === 'indian' ? 'active' : ''}
            onClick={() => setCategory('indian')}
          >
            indian
          </button>
          <button
            className={category === 'chines' ? 'active' : ''}
            onClick={() => setCategory('chines')}
          >
            chinies
          </button>
        </div>

        {(_placeId || _roomId) && (
          <div style={{ marginBottom: 10, color: '#03202a' }}>
            {_placeId && (
              <span style={{ marginRight: 12 }}>
                Place: <strong>{_placeId}</strong>
              </span>
            )}
            {_roomId && (
              <span>
                Room: <strong>{_roomId}</strong>
              </span>
            )}
          </div>
        )}

        <div className="food-list">
          {MENU[category].map(item => (
            <div className="food-item" key={item.id}>
              <div className="food-left">
                <h3>{item.title}</h3>
                <p className="food-desc">{item.desc}</p>
                <div className="food-rating">{item.rating} ★</div>
              </div>
              <div className="food-right">
                <div className="food-price">${item.price}</div>
                <button className="food-add" onClick={() => addItem(item)}>
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h4>Your Order</h4>
          <div className="order-total">
            Total: <span>${total()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <button
              className="proceed-food"
              onClick={() => {
                const payload = { order, total: total(), ts: Date.now() }
                localStorage.setItem(`order:${id}:${roomId}`, JSON.stringify(payload))
                navigate(`/place/${id}/homestays/book/${roomId}/review${window.location.search}`)
              }}
            >
              Proceed to Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
