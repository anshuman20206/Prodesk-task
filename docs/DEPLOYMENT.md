# Deployment Notes

- Build static site (if applicable) and upload to static hosting (Netlify, S3, etc.).
- Host backend on a Node-compatible host (Heroku, Render, DigitalOcean App Platform, AWS ECS, etc.).
- Configure environment variables (MONGO_URI, PORT, JWT_SECRET).
- Use HTTPS and canonical asset URLs (`https://img1.wsimg.com/...`) to avoid mixed-content or blocked external assets.
- Ensure CORS is configured on backend if frontend and backend are on different origins.

Backup and uploads
- Store uploaded resumes in a dedicated `uploads/` folder or object storage (S3). Update `backend` storage path accordingly.
