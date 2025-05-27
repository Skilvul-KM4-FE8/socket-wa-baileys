# 📱 WhatsApp Gateway with Baileys + Express.js

Sebuah WhatsApp Gateway menggunakan [Baileys](https://github.com/WhiskeySockets/Baileys) dan Express.js yang mendukung:

- Scan QR untuk login
- Kirim pesan via endpoint
- Logout dan generate QR baru

---

## 🚀 Fitur

- Login dengan QR Code
- Kirim pesan ke nomor WhatsApp
- Logout dan refresh sesi
- Struktur kode modular & scalable

---

## 📁 Struktur Folder

```bash
.
├── app.js                      # Inisialisasi Express App
├── server.js                   # Entry point (start server + WA socket)
├── routes/
│   └── whatsappRoutes.js       # Routing untuk QR dan logout
├── controllers/
│   └── messageController.js    # (Opsional) Pisahkan logic handler
├── services/
│   └── whatsappService.js      # WhatsApp connection & session handler
├── auth/                       # Folder penyimpanan session WA (auto-generated)
├── public/                     # Static files (opsional)
├── .env                        # File env (PORT dsb)
├── package.json
└── README.md
```

---

## ⚙️ Instalasi

```bash
git clone https://github.com/username/baileys-wa-gateway.git
cd baileys-wa-gateway

npm install
```

---

## 🧪 Menjalankan Server

```bash
node server.js
# atau
nodemon server.js
```

---

## 🌐 API Endpoint

### 🔍 GET `/api/qr`

Mendapatkan QR code saat belum login.

**Response:**

```json
{
  "qr": "data string"
}
```

### ✉️ POST `/send-message`

Mengirim pesan ke nomor WhatsApp.

**Body (JSON):**

```json
{
  "number": "6281234567890",
  "message": "Halo dari API WhatsApp!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "✅ Message sent successfully."
}
```

### 🚪 POST `/api/logout`

Logout sesi WhatsApp dan generate QR baru.

**Response:**

```json
{
  "message": "✅ Logged out and reconnected."
}
```

---

## 📝 Environment Variables

Buat file `.env`:

```bash
PORT=3000
```

---

## 📦 Dependencies

- [baileys](https://www.npmjs.com/package/@whiskeysockets/baileys)
- [express](https://www.npmjs.com/package/express)
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [pino](https://www.npmjs.com/package/pino)

Install:

```bash
npm install express qrcode-terminal @whiskeysockets/baileys fs-extra pino dotenv
```

---

## 🛠️ Tips Penggunaan

- Scan QR hanya perlu dilakukan **satu kali** sampai logout.
- Gunakan Postman atau frontend-mu untuk kirim pesan dan logout.
- Jalankan dengan `nodemon` agar auto-restart saat develop.

---

## 📸 Preview

```bash
🔑 Scan QR Code:
█▀▀▀▀▀█ ▀▄█▀█ ▀▄▀  █ █ █ █▀▀▀▀▀█
...
```

---

## 👨‍💻 Kontributor

- **Muhamad Alfito Santosa** — [@alfitosantosa\_](https://github.com/alfitosantosa)

---
