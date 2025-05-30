Berikut adalah versi yang sudah **dirapikan dan disusun profesional** untuk dokumentasi README dan tutorial POST API WhatsApp Gateway dengan **Baileys + Express.js**:

---

# 📱 WhatsApp Gateway with Baileys + Express.js

Sebuah WhatsApp Gateway berbasis [Baileys](https://github.com/WhiskeySockets/Baileys) dan Express.js, mendukung:

- Scan QR untuk login WhatsApp
- Kirim pesan teks, file, dan gambar via REST API
- Logout dan generate QR baru
- Struktur kode modular & scalable

---

## 🚀 Fitur

- 🔐 Login WhatsApp dengan QR Code
- ✉️ Kirim pesan teks
- 📁 Kirim file atau gambar
- 🚪 Logout dan refresh sesi
- 📦 API siap digunakan untuk integrasi frontend

---

## 📁 Struktur Folder

```bash
.
├── app.js                      # Inisialisasi Express App
├── server.js                   # Entry point (start server + WA socket)
├── routes/
│   └── whatsappRoutes.js       # Routing untuk QR, kirim pesan, logout
├── controllers/
│   └── messageController.js    # Logic kirim pesan (opsional modularisasi)
├── services/
│   └── whatsappService.js      # WhatsApp session & koneksi
├── auth/                       # Folder penyimpanan sesi WhatsApp (auto-generated)
├── public/                     # Static files (opsional)
├── .env                        # Konfigurasi environment
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
# atau untuk development:
nodemon server.js
```

---

## 🌐 API Endpoint

### 🔍 GET `/api/qr`

Mendapatkan QR Code untuk login WhatsApp (jika belum login).

**Response:**

```json
{
  "qr": "data string"
}
```

---

### ✉️ POST `/send-message`

Mengirim pesan teks ke nomor WhatsApp.

**Request Body:**

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

---

### 📁 POST `/send-file`

Mengirim file ke WhatsApp.

```json
{
  "number": "6281234567890",
  "filePath": "https://example.com/file.pdf",
  "caption": "Ini file"
}
```

---

### 🖼️ POST `/send-image`

Mengirim gambar ke WhatsApp.

```json
{
  "number": "6281234567890",
  "imagePath": "https://example.com/image.jpg",
  "caption": "Ini gambar"
}
```

---

### 📦 POST `/send-bulk-files`

Mengirim beberapa file sekaligus.

```json
{
  "files": [
    {
      "number": "6281234567890",
      "filePath": "https://example.com/file1.pdf",
      "caption": "File 1"
    },
    {
      "number": "6289876543210",
      "filePath": "https://example.com/file2.pdf",
      "caption": "File 2"
    }
  ]
}
```

---

### 🖼️ POST `/send-bulk-images`

Mengirim beberapa gambar sekaligus.

```json
{
  "images": [
    {
      "number": "6281234567890",
      "imagePath": "https://example.com/image1.jpg",
      "caption": "Gambar 1"
    },
    {
      "number": "6289876543210",
      "imagePath": "https://example.com/image2.jpg",
      "caption": "Gambar 2"
    }
  ]
}
```

---

### 🚪 POST `/api/logout`

Logout dari WhatsApp dan reset sesi.

**Response:**

```json
{
  "message": "✅ Logged out and reconnected."
}
```

---

## 📝 Konfigurasi `.env`

Buat file `.env` di root project:

```bash
PORT=4567
```

---

## 📦 Dependencies

- [`@whiskeysockets/baileys`](https://www.npmjs.com/package/@whiskeysockets/baileys)
- [`express`](https://www.npmjs.com/package/express)
- [`qrcode-terminal`](https://www.npmjs.com/package/qrcode-terminal)
- [`fs-extra`](https://www.npmjs.com/package/fs-extra)
- [`pino`](https://www.npmjs.com/package/pino)
- [`dotenv`](https://www.npmjs.com/package/dotenv)

```bash
npm install express qrcode-terminal @whiskeysockets/baileys fs-extra pino dotenv
```

---

## 🧪 Tutorial Pengujian via Postman / cURL

👉 Lihat file [`TUTORIAL_POST_API.md`](./TUTORIAL_POST_API.md) untuk contoh lengkap testing via Postman dan `curl`:

- Kirim file: `/send-file`
- Kirim banyak file: `/send-bulk-files`
- Kirim gambar: `/send-image`
- Kirim banyak gambar: `/send-bulk-images`

---

## 📸 Preview Terminal

```bash
🔑 Scan QR Code:
█▀▀▀▀▀█ ▀▄█▀█ ▀▄▀  █ █ █ █▀▀▀▀▀█
...
```

---

## 👨‍💻 Kontributor

- **Muhamad Alfito Santosa** — [@alfitosantosa\_](https://github.com/alfitosantosa)

---

Jika kamu ingin versi Markdown ini dikonversi ke HTML atau dibuatkan template `Postman Collection`, saya bisa bantu juga!
