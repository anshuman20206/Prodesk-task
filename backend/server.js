const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.set("trust proxy", true);

// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

// ================= CORS =================
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

app.use(
  cors({
    origin: FRONTEND_URL === "*" ? true : FRONTEND_URL,
    credentials: true
  })
);

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// ================= FILE UPLOAD =================

// KEEP uploads inside backend folder (BEST PRACTICE)
const uploadsDir = path.join(__dirname, "uploads");

// create folder automatically
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// serve uploaded files
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// ================= SCHEMA =================
const formSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
  resume: String,
  type: String,
  createdAt: { type: Date, default: Date.now }
});

const Form = mongoose.model("Form", formSchema);

// ================= CONTACT =================
app.post("/api/contact", async (req, res) => {
  try {
    await Form.create({ ...req.body, type: "contact" });

    res.json({ success: true, message: "Contact Submitted" });
  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= CAREER =================
app.post("/api/career", upload.single("resume"), async (req, res) => {
  try {
    await Form.create({
      ...req.body,
      resume: req.file ? req.file.filename : "",
      type: "career"
    });

    res.json({ success: true, message: "Application Submitted" });
  } catch (err) {
    console.error("Career Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= HEALTH CHECK =================
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("🚀 API Server Running Successfully");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
