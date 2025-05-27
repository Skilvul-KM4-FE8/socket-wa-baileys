const { getSock } = require("../services/whatsappService");

exports.sendMessage = async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: "'number' and 'message' are required" });
  }

  try {
    const sock = getSock();
    const id = number.includes("@g.us") ? number : `${number}@s.whatsapp.net`;
    await sock.sendMessage(id, { text: message });

    res.json({ success: true, message: "✅ Message sent successfully" });
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};
