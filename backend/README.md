## API endpoints (summary)
Base path: `/api`

Auth (`/api/auth`)
- POST `/login` — Login user. Body: `{ email, password }`.
- POST `/forget` — Send password reset email. Body: `{ email }`.
- POST `/reset/:token` — Reset password with token. Body: `{ newPassword }`.
- POST `/logout` — Clears cookies (logout).

Token (`/api/token`)
- POST `/` — Refresh access & refresh tokens using cookies.

KOLs (`/api/kol`)
- GET `/all` — (admin/director/manager) get all registered KOLs.
- GET `/:id` — (admin/director/manager) view KOL informations.
- POST `/` — (admin/director/manager) create new KOL.
- PATCH `/:id` — (admin/director) modify KOL information.
- DELETE `/:id` — (admin) delete KOL.
- POST `/:id` — (KOL route with checkIfBlocked) add post by KOL.
- GET `/posts/:id` — get all posts by KOL.
- PATCH `/block/:id` — (admin/director) block KOL.
- PATCH `/unblock/:id` — (admin/director) unblock KOL.

Users (`/api/admin`)
- GET `/` — (admin) get all users.
- POST `/` — (admin) create user.
- GET `/:id` — (admin) view user information.
- PATCH `/:id` — (admin) modify user information.
- DELETE `/:id` — (admin) delete user.

Managers (`/api/manager`)
- GET `/` — (admin/director) get all marketing managers in the app.
- POST `/` — (admin/director) create manager.
- GET `/:id` — (admin/director) view manager.
- PATCH `/:id` — (admin/director) modify manager.
- DELETE `/:id` — (admin) delete manager.

## Authentication & Token Flow
- Login sets two HTTP-only cookies: `accessToken` and `refreshToken`.
- `accessToken` is short-lived (15 minutes) and used for authorization checks (not currently read server-side from middleware; `verifyToken` reads refresh token cookie).
- `refreshToken` contains `jti` and `sessionId` claims. Each refresh token is hashed and stored in the `Token` collection.
- `POST /api/token` verifies the refresh token, marks the old token record `isUsed = true`, issues a new refresh token and access token, stores a new token record, and sets cookies.

Note: `verifyToken` middleware currently reads and verifies `refreshToken` cookie (not `accessToken`) and sets `req.user`.

## Data models (Mongoose)
- `Admin` (fields: username, avatar, role [admin|director|manager], email, password, status [enable|disable], resetPasswordToken, resetPasswordTokenExpires)
- `Kol` (country, name, email, socialMedia array, postPrice, inviter, isBlocked, posts array)
- `Manager` (name, regions array, creator ref to User)
- `Token` (userId ref, jti, role, sessionId, isUsed, token (hashed refresh token))

## Validation & Middlewares
- `express-validator` used for request body validation (see `src/validators`).
- `verifyToken` verifies refresh token cookie and attaches `req.user`.
- `checkRole(...roles)` middleware enforces role-based access.
- `checkIfBlocked` prevents blocked KOL accounts from performing certain actions.