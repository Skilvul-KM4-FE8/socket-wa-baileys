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

Berikut adalah file `.md` berjudul `TUTORIAL_POST_API.md` yang berisi **tutorial lengkap cara melakukan POST ke API WhatsApp Media Sender** menggunakan tools seperti **Postman** dan **cURL**:

---

# 📬 Tutorial POST ke API WhatsApp Media Sender

Dokumen ini memberikan panduan langkah demi langkah untuk mengirim **file**, **gambar**, baik **satu per satu** maupun **secara massal** ke WhatsApp melalui API.

---

## 🔧 Persiapan

Sebelum mulai, pastikan:

1. Server API Anda sudah berjalan (contoh: [http://localhost:4567](http://localhost:4567)).
2. Anda sudah **scan QR Code** WhatsApp via terminal.
3. Anda punya URL file/gambar yang valid dan langsung bisa diakses (misalnya dari Firebase, S3, Cloudinary, dll).

---

## 📮 1. Kirim File (POST `/send-file`)

### ✅ Postman

1. Buka Postman → Buat tab baru.
2. Method: `POST`
3. URL: `http://localhost:4567/send-file`
4. Tab `Body` → pilih `raw` → pilih tipe: `JSON`
5. Tempel JSON berikut:

```json
{
  "number": "6281234567890",
  "filePath": "https://example.com/doc.pdf",
  "caption": "Ini dokumen"
}
```

### ✅ cURL

```bash
curl -X POST http://localhost:4567/send-file \
  -H "Content-Type: application/json" \
  -d '{
    "number": "6281234567890",
    "filePath": "https://example.com/doc.pdf",
    "caption": "Ini dokumen"
  }'
```

---

## 📮 2. Kirim Banyak File (POST `/send-bulk-files`)

### ✅ Postman

- URL: `http://localhost:4567/send-bulk-files`
- Body:

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

### ✅ cURL

```bash
curl -X POST http://localhost:4567/send-bulk-files \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

---

## 🖼️ 3. Kirim Gambar (POST `/send-image`)

### ✅ Postman

- URL: `http://localhost:4567/send-image`
- Body:

```json
{
  "number": "6281234567890",
  "imagePath": "https://example.com/image.jpg",
  "caption": "Ini gambar"
}
```

### ✅ cURL

```bash
curl -X POST http://localhost:4567/send-image \
  -H "Content-Type: application/json" \
  -d '{
    "number": "6281234567890",
    "imagePath": "https://example.com/image.jpg",
    "caption": "Ini gambar"
  }'
```

---

## 🖼️ 4. Kirim Banyak Gambar (POST `/send-bulk-images`)

### ✅ Postman

- URL: `http://localhost:4567/send-bulk-images`
- Body:

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

### ✅ cURL

```bash
curl -X POST http://localhost:4567/send-bulk-images \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

---

## ℹ️ Tips Tambahan

- Gunakan VPN jika file Anda dibatasi region tertentu.
- Untuk testing cepat, Anda bisa upload file ke [file.io](https://www.file.io) atau layanan hosting gratis lainnya.

---

Jika Anda ingin menambahkan contoh upload video/audio atau ingin versi HTML dari dokumentasi ini, cukup beri tahu saya.
