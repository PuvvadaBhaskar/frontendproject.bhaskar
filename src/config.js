// Small client-side config for admin detection
// Add/remove addresses here to control which emails open the admin panel.
export const ADMIN_EMAILS = [
  'admin@admin.com',
  'na@admin.com',
  'super@na.com',
  'ops@na.org',
  'mr.bhaskar090@gmail.com'
]

// Helper to decide admin access. Current rules:
// - explicit inclusion in ADMIN_EMAILS
// - OR email contains the substring "na" (case-insensitive)
export function isAdminEmail(email){
  if (!email) return false
  const norm = String(email).toLowerCase().trim()
  if (ADMIN_EMAILS.includes(norm)) return true
  return norm.includes('na')
}

export default {
  ADMIN_EMAILS,
  isAdminEmail,
}

// Base URL for backend API. Set using Vite env variable `VITE_API_BASE`.
// Example: VITE_API_BASE=http://localhost:4000
export const API_BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE ? import.meta.env.VITE_API_BASE : ''
