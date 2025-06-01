const express = require("express");
const router = express.Router();
const { getCurrentQr, logoutWhatsApp, connectToWhatsApp, getConnectionStatus } = require("../services/whatsappService");

// Get QR Code
router.get("/qr", async (req, res) => {
  try {
    const qr = getCurrentQr();
    const status = getConnectionStatus();

    console.log(`QR Endpoint - Status: ${status}, QR: ${qr ? "exists" : "null"}`); // Debug log

    if (!qr) {
      if (status !== "connecting") {
        console.log("No QR available, initiating new connection...");
        await connectToWhatsApp();
      }
      return res.status(202).json({
        status,
        message: status === "connecting" ? "Waiting for QR generation..." : "Initiating new connection...",
      });
    }

    res.json({
      status,
      qr,
      expiresAt: Date.now() + 60000,
    });
  } catch (err) {
    console.error("QR Endpoint Error:", err);
    res.status(500).json({
      status: getConnectionStatus(),
      error: err.message,
    });
  }
});

// ... (status dan logout endpoint tetap sama)

// Get WhatsApp status
router.get("/status", (req, res) => {
  const status = getConnectionStatus();
  res.json({
    status, // 'connecting', 'connected', or 'disconnected'
    timestamp: new Date(),
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
