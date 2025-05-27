const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/messageController");
const { sendBulkMessages } = require("../controllers/bulkController");

router.post("/send", sendMessage);
router.post("/bulk", sendBulkMessages);

module.exports = router;
