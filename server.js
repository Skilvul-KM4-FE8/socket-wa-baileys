require("dotenv").config();
const app = require("./app");
const { connectToWhatsApp } = require("./services/whatsappService");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});

connectToWhatsApp();
