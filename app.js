const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const messageRoutes = require("./routes/messageRoute");
const whatsappRoutes = require("./routes/whatsappRoute");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/messages", messageRoutes);
app.use("/api", whatsappRoutes);

app.get("/", (req, res) => {
  res.send("🚀 WhatsApp Gateway is running");
});

module.exports = app;
