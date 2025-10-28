# TicketApp — React Implementation

This folder contains the React (Vite) implementation of the TicketApp frontend.

Overview
- Framework: React 18 (Vite)
- Routing: react-router-dom v6
- State & storage: localStorage (session key: `ticketapp_session`)

Features
- Landing page with wave hero and decorative circles
- Login & Signup (simulated auth using localStorage)
- Protected Dashboard and Tickets pages
- Ticket CRUD (create, read, update, delete) persisted in localStorage
- Validation for required fields and status values (open, in_progress, closed)

Quick setup
1. cd react
2. npm install
3. npm run dev

Example test user
- Email: demo@ticket.app
- Password: Password123

Notes
- Session stored under `ticketapp_session`. Logout clears the session and redirects to login.
- Tickets are stored in `ticketapp_tickets` in localStorage.
- The app intentionally uses a small simulated delay to mimic network calls.

Accessibility & Responsiveness
- Uses semantic HTML where possible and visible focusable controls.
- Max content width is 1440px and layout is responsive for mobile and tablet.

Files of interest
- `src/components` — UI screens and shared components
- `src/services` — `auth.js` and `tickets.js` (localStorage-backed services)
- `assets/wave.svg` — hero wave used across frameworks
