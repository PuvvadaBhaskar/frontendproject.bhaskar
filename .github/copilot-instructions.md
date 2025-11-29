# Guidance for AI coding agents — frontendproject.bhaskar

Short, practical notes to help AI agents get productive quickly in this repository.

## Big-picture architecture
- Single Page Application built with React (Vite) — entry point is `src/main.jsx` and routing is defined in `src/App.jsx` (BrowserRouter + Routes + Route).  
- UI is composed of small per-page components under `src/Homepage/` and shared UI pieces in `src/components/` (e.g., `TopNav.jsx`).  
- There is no server-side API in this repo — app uses static/demo data in `src/Homepage/data.js` and browser storage (localStorage) for lightweight persistence.

## Key files & where to look
- Routes & navigation: `src/App.jsx` (all top-level routes live here)  
- Sample data: `src/Homepage/data.js`  
- Booking flow: `src/Homepage/FoodMenu.jsx` (writes `localStorage`) and `src/Homepage/ReviewBooking.jsx` (reads `localStorage` and confirms booking).  
- Global navigation header: `src/components/TopNav.jsx` (uses browser geolocation + OpenStreetMap Nominatim reverse geocoding).  
- Per-component CSS files sit next to jsx files (e.g., `TopNav.css`, `Booking.css`) — follow that convention when adding styles.

## Important patterns & conventions (do not invent alternatives without reason)
- Routing: react-router-dom v7 style — use `useNavigate`, `useParams`, `Link`, and update `src/App.jsx` for new routes.  
- localStorage naming pattern (used for orders): `order:<placeId>:<roomId>` — preserve this key pattern if adding features that read/write orders.  
- Query params are preserved using `window.location.search` across navigations (FoodMenu → ReviewBooking uses this). Keep using that pattern where appropriate.  
- Components favor client-side state + localStorage; there’s no notion of a backend auth token or API layer in this repository.

## Build / run / lint (explicit commands)
- Install dependencies: `npm install`  
- Start dev server (HMR): `npm run dev`  
- Build production bundle: `npm run build`  
- Preview production build locally: `npm run preview`  
- Lint: `npm run lint` (ESLint config is at `eslint.config.js`)

## External dependencies & integration notes
- Reverse geocoding in `TopNav.jsx` calls OpenStreetMap Nominatim directly — no API key: be aware of rate limits when testing.  
- Many images reference Unsplash; tests or CI that expect stable assets should consider localizing or mocking those requests.

## How AI agents should approach changes (concrete examples)
- Adding a new page/route: 1) add component in `src/Homepage/` or `src/components/`, 2) add CSS file next to it, 3) register route in `src/App.jsx`.  
- Modifying booking flow: update `FoodMenu.jsx` (order creation), keep localStorage key format `order:<id>:<roomId>`, and update `ReviewBooking.jsx` (order rendering + confirm flow).  
- Preserve existing UX choices: use `window.location.search` to keep query params and `navigate()` to move the user between pages.  
- When changing UI, mirror component-level CSS naming and structure for consistency.  

## Useful examples from this codebase
- Route example (all routes live in `src/App.jsx`):
  - `Route path="/place/:id/homestays/book/:roomId/food"` → `src/Homepage/FoodMenu.jsx`
- localStorage example (write): `localStorage.setItem(`order:${id}:${roomId}`, JSON.stringify(payload))` (FoodMenu)
- localStorage example (read): `localStorage.getItem(`order:${id}:${roomId}`)` and JSON.parse (ReviewBooking)

## Safety / constraints
- There are no API secrets or server-side code here — do not invent or assume a backend API. If a feature needs persistence beyond localStorage, flag that and propose small API contracts rather than creating server-side code silently.  
- Rate-limit external calls (OpenStreetMap Nominatim) and avoid heavy network requests during unit tests or CI.

## Development checklist for PRs
1. Run `npm run dev` or `npm run build` to verify app boots.  
2. Run `npm run lint` and fix lint errors.  
3. Follow existing patterns for route names, key formats, and storing UI state.  

---
If anything here is unclear or you want me to add examples for a specific change (e.g., add a new route, persist bookings to a backend, or add tests), tell me which scenario and I’ll expand the instructions with precise code-change examples and test steps. 
