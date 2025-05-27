const { getSock } = require("../services/whatsappService");

exports.sendBulkMessages = async (req, res) => {
  const { numbers, message } = req.body;

  if (!Array.isArray(numbers) || numbers.length === 0 || !message) {
    return res.status(400).json({ error: "'numbers' must be a non-empty array and 'message' is required" });
  }

  //post

  // [
  //   {
  //     number: "1234567890",
  //     message: "Hello, this is a test message",
  //   },
  //   {
  //     number: "0987654321",
  //     message: "Hello, this is another test message",
  //   },
  // ];

  try {
    const sock = getSock();
    const results = [];

    for (const number of numbers) {
      let id, text;
      if (typeof number === "object" && number.number && number.message) {
        id = number.number.includes("@g.us") ? number.number : `${number.number}@s.whatsapp.net`;
        text = number.message;
      } else {
        id = number.includes("@g.us") ? number : `${number}@s.whatsapp.net`;
        text = message;
      }

      try {
        await sock.sendMessage(id, { text: message });
        results.push({ number, status: "success", message: "✅ Message sent successfully" });
      } catch (err) {
        console.error(`❌ Error sending message to ${number}:`, err);
        results.push({ number, status: "error", message: `Failed to send message: ${err.message}` });
      }
    }
    res.json({ success: true, results });
  } catch (error) {
    console.error("❌ Error in sendBulkMessages:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
