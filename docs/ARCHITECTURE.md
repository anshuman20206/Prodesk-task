# Architecture Overview

Repository layout (top-level):

- `backend/` — Node.js backend (Express) with routes for contact and career.
- `prodesk.in/` — static HTML site (exported pages like `home.html`, `contact.html`, `careers.html`, etc.).
- `hts-cache/`, `uploads/`, and other auxiliary folders.

Backend
- Express server in `backend/server.js`.
- Uses `multer` for file uploads (career/resume), `mongoose` to persist data to MongoDB.
- Default port: `5000` (overridable via `PORT` env var).

Frontend
- Static HTML pages with a shared header widget — header behavior depends on valid DOM and accessible external scripts/assets.
- External assets served by `img1.wsimg.com` and a remote signals client script — prefer absolute `https://` URLs for deep routes.

Key integration points
- Forms on `contact.html` and `careers.html` must `POST` to backend endpoints.
- File uploads: the `resume` input name must match the backend's `upload.single('resume')` usage.
