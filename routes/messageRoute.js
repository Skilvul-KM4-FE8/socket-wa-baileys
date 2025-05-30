const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/messageController");
const { sendBulkMessages } = require("../controllers/bulkController");
const { sendFile, sendBulkFiles, sendImage, sendBulkImages } = require("../controllers/fileController");

router.post("/send", sendMessage);
router.post("/bulk", sendBulkMessages);
router.post("/sendfile", sendFile);
router.post("/sendfilebulk", sendBulkFiles);
router.post("/sendImage", sendImage);
router.post("/sendimagebulk", sendBulkImages);

module.exports = router;
