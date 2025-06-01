const { makeWASocket, DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const fs = require("fs-extra");
const path = require("path");

let sock = null;
let currentQr = null;
let connectionStatus = "disconnected"; // ['connecting', 'connected', 'disconnected']
let reconnectAttempts = 0;

async function initializeWhatsApp() {
  const authDir = path.join(__dirname, "../auth");
  await fs.ensureDir(authDir);

  const { state, saveCreds } = await useMultiFileAuthState(authDir);
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true, // Aktifkan untuk debugging
    browser: ["Baileys-Express", "Chrome", "1.0.0"],
  });

  sock.ev.on("connection.update", (update) => {
    console.log("Connection Update:", update); // Debug logging

    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentQr = qr;
      connectionStatus = "connecting";
      console.log("QR Received:", qr.substring(0, 20) + "..."); // Log partial QR
    }

    if (connection === "open") {
      currentQr = null;
      connectionStatus = "connected";
      reconnectAttempts = 0;
      console.log("Successfully Connected");
    }

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      connectionStatus = "disconnected";
      currentQr = null;

      if (shouldReconnect && reconnectAttempts < 5) {
        reconnectAttempts++;
        const delay = Math.min(5000 * reconnectAttempts, 30000); // Exponential backoff
        console.log(`Reconnecting in ${delay}ms...`);
        setTimeout(connectToWhatsApp, delay);
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);
}

async function connectToWhatsApp() {
  if (connectionStatus === "connecting") return;

  try {
    connectionStatus = "connecting";
    console.log("Attempting to connect...");

    await initializeWhatsApp();
  } catch (err) {
    console.error("Connection Error:", err);
    connectionStatus = "disconnected";
    currentQr = null;

    // Retry after error
    setTimeout(connectToWhatsApp, 5000);
  }
}

async function logoutWhatsApp() {
  if (!sock) return;

  try {
    console.log("Logging out...");
    await sock.logout();
  } catch (err) {
    console.error("Logout Error:", err);
  } finally {
    connectionStatus = "disconnected";
    currentQr = null;
    sock = null;

    // Clear auth files
    try {
      await fs.emptyDir(path.join(__dirname, "../auth"));
      console.log("Auth directory cleared");
    } catch (err) {
      console.error("Error clearing auth:", err);
    }
  }
}

function getCurrentQr() {
  return currentQr;
}

function getConnectionStatus() {
  return connectionStatus;
}

// Auto-connect when service starts
connectToWhatsApp();

module.exports = {
  connectToWhatsApp,
  getCurrentQr,
  getConnectionStatus,
  logoutWhatsApp,
};
