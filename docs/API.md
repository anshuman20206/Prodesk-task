# API Reference

Base URL: `http://localhost:5000` (default)

POST /api/contact
- Description: Accepts contact form submissions.
- Content-Type: `application/json` or `application/x-www-form-urlencoded` depending on frontend.
- Expected fields (example):
  - `name` (string)
  - `email` (string)
  - `phone` (string)
  - `message` (string)

Response: backend returns JSON status indicating success or error.

POST /api/career
- Description: Accepts career/resume submissions.
- Content-Type: `multipart/form-data`
- Form field for file upload: `resume` (file)
- Other form fields: `name`, `email`, `phone`, `message`, etc.

Notes
- Ensure the frontend form `action` points to the backend host:port (e.g., `http://localhost:5000/api/contact`).
- If you receive HTTP 405 when submitting forms, verify you're posting to the backend (not to a static dev server port).
