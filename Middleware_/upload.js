// Middleware_/upload.js
const multer = require("multer");

// Store file in memory; we'll upload buffer directly to Supabase
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
