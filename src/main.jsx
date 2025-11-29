import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root'))
// Global handler to surface promise rejections in dev without leaving uncaught messages
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', event => {
    // Prevent the default browser console message and log a clearer message
    console.error('Unhandled promise rejection:', event.reason)
  })
  window.addEventListener('error', event => {
    // Log global errors (resource load failures will still appear in network tab)
    console.error('Global error captured:', event.message || event.error)
  })
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
