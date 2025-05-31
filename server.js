require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Konfigurasi CORS untuk mengizinkan semua origin
app.use(
  cors({
    origin: "*", // Mengizinkan semua domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Metode yang diizinkan
    allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
  })
);

const { connectToWhatsApp } = require("./services/whatsappService");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});

connectToWhatsApp();
