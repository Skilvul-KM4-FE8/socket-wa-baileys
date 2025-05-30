// controllers/messageController.js
const { getSock } = require("../services/whatsappService");

/**
 * Helper to send a single media message
 * type: 'document', 'image', etc.
 */
const sendMedia = async ({ sock, number, url, type, caption = "" }) => {
  if (!number || !url) throw new Error("'number' and media URL are required");

  const id = number.includes("@g.us") ? number : `${number}@s.whatsapp.net`;
  const media = await sock.prepareMessageMedia({ url }, type);

  await sock.sendMessage(id, {
    [type]: media,
    caption,
  });

  return { number, status: "success", message: `✅ ${type} sent successfully` };
};

/**
 * Send single file (document)
 * req.body: { number, filePath, caption }
 */
exports.sendFile = async (req, res) => {
  const { number, filePath, caption } = req.body;
  try {
    const sock = getSock();
    const result = await sendMedia({
      sock,
      number,
      url: filePath,
      type: "document",
      caption,
    });
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("❌ Error sending file:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Send multiple files (documents)
 * req.body: { files: [{ number, filePath, caption }] }
 */
exports.sendBulkFiles = async (req, res) => {
  const { files } = req.body;
  if (!Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ error: "'files' must be a non-empty array" });
  }

  const sock = getSock();
  const results = await Promise.all(
    files.map(async ({ number, filePath, caption }) => {
      try {
        return await sendMedia({
          sock,
          number,
          url: filePath,
          type: "document",
          caption,
        });
      } catch (err) {
        return { number, status: "error", message: err.message };
      }
    })
  );

  res.json({ success: true, results });
};

/**
 * Send single image
 * req.body: { number, imagePath, caption }
 */
exports.sendImage = async (req, res) => {
  const { number, imagePath, caption } = req.body;
  try {
    const sock = getSock();
    const result = await sendMedia({
      sock,
      number,
      url: imagePath,
      type: "image",
      caption,
    });
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("❌ Error sending image:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Send multiple images
 * req.body: { images: [{ number, imagePath, caption }] }
 */
exports.sendBulkImages = async (req, res) => {
  const { images } = req.body;
  if (!Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: "'images' must be a non-empty array" });
  }

  const sock = getSock();
  const results = await Promise.all(
    images.map(async ({ number, imagePath, caption }) => {
      try {
        return await sendMedia({
          sock,
          number,
          url: imagePath,
          type: "image",
          caption,
        });
      } catch (err) {
        return { number, status: "error", message: err.message };
      }
    })
  );

  res.json({ success: true, results });
};
