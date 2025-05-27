const express = require("express");
const router = express.Router();
const { getCurrentQr, logoutWhatsApp } = require("../services/whatsappService");

// Get QR Code (base64)
router.get("/qr", (req, res) => {
  const qr = getCurrentQr();
  if (!qr) return res.status(404).json({ message: "QR belum tersedia atau sudah login." });

  res.json({ qr });
});

// Logout & refresh QR
router.post("/logout", async (req, res) => {
  await logoutWhatsApp();
  // Reconnect untuk mendapatkan QR baru
  const { connectToWhatsApp } = require("../services/whatsappService");
  await connectToWhatsApp();
  res.json({ message: "✅ Logged out and reconnected." });
});

module.exports = router;
