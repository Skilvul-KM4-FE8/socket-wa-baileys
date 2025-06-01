const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const messageRoutes = require("./routes/messageRoute");
const whatsappRoutes = require("./routes/whatsappRoute");

const app = express();
app.use(
  cors({
    origin: "*", // Mengizinkan semua domain
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Semua method yang diizinkan
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"], // Semua headers yang diizinkan
    credentials: true, // Izinkan credentials jika diperlukan
    optionsSuccessStatus: 200, // Untuk browser yang kompatibel
  })
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/messages", messageRoutes);
app.use("/api", whatsappRoutes);

app.get("/", (req, res) => {
  res.send("🚀 WhatsApp Gateway is running");
});

module.exports = app;
