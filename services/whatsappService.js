const { makeWASocket, DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require("pino");
const fs = require("fs-extra");
const path = require("path");

let sock;
let currentQr = null;
let connectionStatus = "disconnected"; // ['connecting', 'connected', 'disconnected']

async function connectToWhatsApp() {
  if (connectionStatus === "connecting") return;
  connectionStatus = "connecting";

  try {
    const authDir = path.join(__dirname, "../auth");
    await fs.ensureDir(authDir);

    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      auth: state,
      printQRInTerminal: false,
      browser: ["Baileys-Express", "Chrome", "1.0.0"],
    });

    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        currentQr = qr;
        connectionStatus = "connecting";
      }

      if (connection === "close") {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        connectionStatus = "disconnected";

        if (shouldReconnect) {
          setTimeout(connectToWhatsApp, 5000);
        }
      }

      if (connection === "open") {
        currentQr = null;
        connectionStatus = "connected";
      }
    });

    sock.ev.on("creds.update", saveCreds);
  } catch (err) {
    console.error("Connection error:", err);
    connectionStatus = "disconnected";
  }
}

async function logoutWhatsApp() {
  if (!sock) return;

  try {
    await sock.logout();
    connectionStatus = "disconnected";
    currentQr = null;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await fs.emptyDir(path.join(__dirname, "../auth"));

    console.log("Logged out successfully");
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
}

function getConnectionStatus() {
  return connectionStatus;
}

function getCurrentQr() {
  return currentQr;
}

module.exports = {
  connectToWhatsApp,
  getCurrentQr,
  getConnectionStatus,
  logoutWhatsApp,
};
