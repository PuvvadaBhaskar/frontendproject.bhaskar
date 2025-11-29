import cards from '../Homepage/data'

function safeParse(raw){
  try { return raw ? JSON.parse(raw) : null } catch { return null }
}

export function getStoredGuides(){
  const raw = localStorage.getItem('guides')
  return safeParse(raw) || []
}

export function getStoredHomestays(){
  const raw = localStorage.getItem('homestays')
  return safeParse(raw) || []
}

export function getStoredSpots(){
  const raw = localStorage.getItem('spots')
  return safeParse(raw) || []
}

// Return places (cards) but do not modify original import; callers can merge homestays/guides as needed
export function getPlaces(){
  return Array.isArray(cards) ? cards.slice() : []
}

export default {
  getPlaces,
  getStoredGuides,
  getStoredHomestays,
  getStoredSpots,
}
