# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Optional server (Express + MongoDB)

This repo includes a lightweight Express server in the `server/` folder that can be used to persist bookings and serve demo data.

Quick start (server):

```powershell
cd server
npm install
cp .env.example .env
# set MONGODB_URI in .env then:
npm run dev
```

From the repo root you can run:

```powershell
npm run server:dev
```

API endpoints:

- `GET /api/places` — returns demo places (reads `src/Homepage/data.js`)
- `GET /api/bookings` — returns bookings from MongoDB
- `POST /api/bookings` — create a new booking

Be careful not to commit real DB credentials. Use `.env` and secret managers in CI.

**Firebase**: Quick frontend setup

- **Install dependency:** run `npm install` in the repo root (the `firebase` SDK is listed in `package.json`).
- **Config:** the project includes `src/firebase.js` with a sample config. Replace values with your Firebase project's config if you create a new Firebase project.
- **Exports:** `src/firebase.js` exports `app`, `db`, `auth`, and `storage` for use across the app.
- **Run dev server:** `npm run dev`
