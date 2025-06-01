const express = require("express");
const router = express.Router();
const { getCurrentQr, logoutWhatsApp, connectToWhatsApp, getConnectionStatus } = require("../services/whatsappService");

// Get QR Code
router.get("/qr", async (req, res) => {
  try {
    const qr = getCurrentQr();
    const status = getConnectionStatus();

    if (!qr && status !== "connecting") {
      await connectToWhatsApp();
      return res.status(202).json({
        message: "Preparing new QR code...",
      });
    }

    if (!qr) {
      return res.status(204).end(); // No content but not an error
    }

    res.json({
      qr,
      status,
      expiresAt: Date.now() + 60000,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get WhatsApp status
router.get("/status", (req, res) => {
  const status = getConnectionStatus();
  res.json({
    status, // 'connecting', 'connected', or 'disconnected'
    timestamp: new Date().toISOString(),
  });
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    await logoutWhatsApp();

    // Delay before reconnecting to ensure clean state
    setTimeout(() => {
      connectToWhatsApp();
    }, 3000);

    res.json({
      success: true,
      message: "Logout successful. New connection will be established shortly.",
      status: getConnectionStatus(),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      status: getConnectionStatus(),
    });
  }
});

module.exports = router;
