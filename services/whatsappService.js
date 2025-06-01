const { makeWASocket, DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal");
const pino = require("pino");
const fs = require("fs-extra"); // install via npm i fs-extra

let sock;
let currentQr = null; // simpan QR terbaru

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`✅ Using WhatsApp v${version.join(".")}, isLatest: ${isLatest}`);

  sock = makeWASocket({
    version,
    logger: pino({ level: "silent" }),
    auth: state,
    browser: ["Baileys-Express", "Chrome", "1.0.0"],
    getMessage: async () => ({ conversation: "Hello from Baileys!" }),
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentQr = qr; // simpan QR
      console.log("🔑 Scan QR Code:");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log("❌ Connection closed:", lastDisconnect?.error, "Reconnect:", shouldReconnect);
      if (shouldReconnect) connectToWhatsApp();
    }

    if (connection === "open") {
      console.log("✅ Connected to WhatsApp");
      currentQr = null;
    }
  });

  sock.ev.on("messages.upsert", (m) => {
    console.log("📩 Message received:", JSON.stringify(m, null, 2));
  });

  sock.ev.on("creds.update", saveCreds);
}

async function logoutWhatsApp() {
  if (sock) {
    try {
      await sock.logout(); // logout dari WhatsApp
      sock = null;
      currentQr = null;

      // Tunggu sejenak agar file dilepaskan (penting di Docker/Windows)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Hapus folder auth
      await fs.remove("./auth");

      console.log("🚪 Logged out and removed session.");
    } catch (err) {
      console.error("❌ Error during logout:", err);
    }
  } else {
    console.log("⚠️ No active session to logout.");
  }
}


function getSock() {
  return sock;
}

function getCurrentQr() {
  return currentQr;
}

module.exports = {
  connectToWhatsApp,
  getCurrentQr,
  getSock,
  logoutWhatsApp,
};
