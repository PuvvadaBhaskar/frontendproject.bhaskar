**Purpose**

This file gives concise, actionable guidance for AI coding agents working on this repository. Focus on the minimal, reproducible steps needed to be productive: how the app runs, where important logic lives, and project-specific conventions.

**Quick start (dev)**

- **Install dependencies:** `npm install` at repo root
- **Frontend dev server:** `npm run dev` (uses Vite)
- **Backend dev server (optional):** `npm run server:dev` (changes directory to `server/` and runs its dev script)
- **Build for production:** `npm run build`

**Big-picture architecture**

- Single-page React app (Vite) in `src/` with routing defined in `src/App.jsx`.
- Optional Express + MongoDB backend under `server/` (lightweight API used for demo bookings and places). See `server/index.js` and `server/README.md` for details.
- Firebase used for auth, Firestore and storage. Config is in `src/firebase.js` and exported as `{ app, db, auth, storage }`.
- Client–server API base is set by the Vite env variable `VITE_API_BASE`. See `src/config.js` (`API_BASE`) and `src/lib/dataService.js` for how requests are constructed.

**Where to look for common tasks**

- Routing & pages: `src/App.jsx`, `src/Homepage/*` (login, signup, home, explore, homestays, booking flows).
- Top navigation: `src/components/TopNav.jsx` and `TopNav.css`.
- Authentication / storage: `src/firebase.js`.
- Admin rules and small client config: `src/config.js` (contains `ADMIN_EMAILS` and `isAdminEmail()` — the app uses this for displaying admin UI).
- Demo data: `src/Homepage/data.js` (also used by server `GET /api/places` in the optional backend).
- API helper: `src/lib/dataService.js` (pattern for calling backend endpoints).

**Project-specific conventions & patterns**

- File layout: feature pages live under `src/Homepage/` (many page-level components in that folder). Reuse smaller UI pieces in `src/components/`.
- Routing uses `react-router-dom` and maps closely to file-level page components; look at `App.jsx` routes for canonical routes (e.g., `/place/:id/homestays/book/:roomId`).
- Small client-side admin check: `src/config.js` contains a simple allowlist plus a substring rule (`'na'`) — do not change this without understanding UI implications.
- Environment configuration: use Vite env vars (`VITE_...`) for runtime differences. `API_BASE` falls back to empty string when not provided.

**Backend integration notes**

- The backend is optional and lives in `server/`. It expects a `.env` with `MONGODB_URI` when using MongoDB. The repo README shows `server` quickstart (`cd server && npm install && cp .env.example .env && npm run dev`).
- API endpoints referenced in the frontend:
  - `GET /api/places` — demo places (server reads `src/Homepage/data.js`)
  - `GET /api/bookings` — bookings from DB
  - `POST /api/bookings` — create booking

**Common developer workflows**

- Start frontend only: `npm install` then `npm run dev`.
- Start backend (if developing server): `npm run server:dev` from repo root or `cd server && npm install && npm run dev`.
- Linting: `npm run lint` (ESLint is configured in `eslint.config.js`).

**Safety & secrets**

- Do NOT commit production DB credentials or real Firebase service account data. Use `.env` (server) and Vite env variables for secrets.
- `src/firebase.js` currently contains demo/project config; when replacing, keep credentials out of source control.

**Examples to reference in edits**

- Add a new page route: mirror the pattern used in `src/App.jsx` and add the component under `src/Homepage/`.
- Call the backend: use `src/lib/dataService.js` to follow request patterns and `API_BASE` from `src/config.js`.

**What not to change**

- Don't change the admin detection heuristic in `src/config.js` lightly — it gates admin UI across many pages.
- Avoid hardcoding API URLs in components — use `API_BASE` or `lib/dataService.js`.

**If something is missing**

- If the `server/` package manifest or index are intentionally removed/stripped, ask the human owner before re-creating backend scaffolding. The README documents the intended server behavior and endpoints.

If any section is unclear or you need access to secrets, please ask the repository owner for clarification.
