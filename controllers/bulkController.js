const { getSock } = require("../services/whatsappService");

exports.sendBulkMessages = async (req, res) => {
  const messages = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Request body must be a non-empty array of messages." });
  }

  try {
    const sock = getSock();
    const results = [];

    for (const item of messages) {
      if (!item.number || !item.message) {
        results.push({ number: item.number || "-", status: "error", message: "Missing number or message" });
        continue;
      }

      const id = item.number.includes("@g.us") ? item.number : `${item.number}@s.whatsapp.net`;

      try {
        await sock.sendMessage(id, { text: item.message });
        results.push({ number: item.number, status: "success", message: "✅ Message sent successfully" });
      } catch (err) {
        console.error(`❌ Error sending message to ${item.number}:`, err);
        results.push({ number: item.number, status: "error", message: `Failed to send message: ${err.message}` });
      }
    }

    res.json({ success: true, results });
  } catch (error) {
    console.error("❌ Error in sendBulkMessages:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
