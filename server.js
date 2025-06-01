require("dotenv").config();
const app = require("./app");
const { connectToWhatsApp } = require("./services/whatsappService");
const cors = require("cors");

const PORT = process.env.PORT || 4567;

app.listen(PORT, () => {
  console.log(`🌐 Server running at http://localhost:${PORT}`);
});

connectToWhatsApp();
