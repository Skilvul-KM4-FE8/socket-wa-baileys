require("dotenv").config();
const app = require("./app");
const { connectToWhatsApp } = require("./services/whatsappService");
const cors = require("cors");

const PORT = process.env.PORT || 4567;

app.use(
  cors({
    origin: "*", // Mengizinkan semua domain
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Semua method yang diizinkan
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"], // Semua headers yang diizinkan
    credentials: true, // Izinkan credentials jika diperlukan
    optionsSuccessStatus: 200, // Untuk browser yang kompatibel
  })
);

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});

connectToWhatsApp();
