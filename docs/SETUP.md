# Local Setup

1. Prerequisites
   - Node.js (v14+ recommended)
   - npm
   - MongoDB URI (Atlas or local)

2. Backend

```bash
cd backend
npm install
# create .env with MONGO_URI and optional PORT
# start server
node server.js
```

3. Frontend
- Serve `prodesk.in/` using a static file server, for example:

```bash
# using http-server (install globally if needed)
npm install -g http-server
cd prodesk.in
http-server -p 5500
```

4. Verify
- Open `http://localhost:5500/contact.html` and submit the contact form. The form `action` should point to `http://localhost:5000/api/contact`.
- For careers, ensure `enctype="multipart/form-data"` and file input name `resume`.
