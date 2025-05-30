# 📱 WhatsApp Gateway with Baileys + Express.js

A robust WhatsApp Gateway based on [Baileys](https://github.com/WhiskeySockets/Baileys) and Express.js, featuring:

- QR code login for WhatsApp
- Send text messages, files, and images via REST API
- Logout and generate new QR sessions
- Modular and scalable code structure

![QR Code Example](https://via.placeholder.com/300) <!-- Add actual screenshot if available -->

## 🚀 Features

- 🔐 WhatsApp login via QR Code
- ✉️ Send text messages
- 📁 Send files and documents
- 🖼️ Send images with captions
- 📢 Bulk messaging capability
- 🚪 Session logout and refresh
- 📦 API ready for frontend integration

## ⚙️ Installation

```bash
git clone https://github.com/username/baileys-wa-gateway.git
cd baileys-wa-gateway
npm install
```

## 🧪 Running the Server

```bash
node server.js
# or for development:
nodemon server.js
```

## 🌐 API Endpoints

### 🔍 GET `/api/qr`

Get QR code for WhatsApp login

### ✉️ POST `/send`

Send text message to a WhatsApp number

**Request Body:**

```json
{
  "number": "6281234567890",
  "message": "Hello from WhatsApp API!"
}
```

### 📢 POST `/bulk`

Send text messages to multiple numbers

**Request Body:**

```json
{
  "messages": [
    { "number": "6281234567890", "message": "Message 1" },
    { "number": "6289876543210", "message": "Message 2" }
  ]
}
```

### 📁 POST `/sendfile`

Send file to a WhatsApp number

**Request Body:**

```json
{
  "number": "6281234567890",
  "filePath": "https://example.com/file.pdf",
  "caption": "Here's the PDF file"
}
```

### 📁 POST `/sendfilebulk`

Send files to multiple numbers

**Request Body:**

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

### 🖼️ POST `/sendimage`

Send image to a WhatsApp number

**Request Body:**

```json
{
  "number": "6281234567890",
  "imagePath": "https://example.com/image.jpg",
  "caption": "Check this image"
}
```

### 🖼️ POST `/sendimagebulk`

Send images to multiple numbers

**Request Body:**

```json
{
  "images": [
    {
      "number": "6281234567890",
      "imagePath": "https://example.com/image1.jpg",
      "caption": "Image 1"
    },
    {
      "number": "6289876543210",
      "imagePath": "https://example.com/image2.jpg",
      "caption": "Image 2"
    }
  ]
}
```

### 🚪 POST `/api/logout`

Logout WhatsApp session and generate new QR

## 📁 Project Structure

```bash
.
├── app.js                      # Express application setup
├── server.js                   # Entry point (server + WA socket)
├── routes/
│   └── whatsappRoutes.js       # API routes for QR, messages, logout
├── controllers/
│   └── messageController.js    # Message handling logic
├── services/
│   └── whatsappService.js      # WhatsApp session management
├── auth/                       # WhatsApp session storage
├── public/                     # Static files (optional)
├── .env                        # Environment configuration
├── package.json
└── README.md
```

## 📝 Environment Configuration

Create `.env` file in root directory:

```bash
PORT=4567
```

## 📦 Dependencies

- [`@whiskeysockets/baileys`](https://www.npmjs.com/package/@whiskeysockets/baileys)
- [`express`](https://www.npmjs.com/package/express)
- [`qrcode-terminal`](https://www.npmjs.com/package/qrcode-terminal)
- [`fs-extra`](https://www.npmjs.com/package/fs-extra)
- [`pino`](https://www.npmjs.com/package/pino)
- [`dotenv`](https://www.npmjs.com/package/dotenv)

Install with:

```bash
npm install express qrcode-terminal @whiskeysockets/baileys fs-extra pino dotenv
```

## 👨‍💻 Contributors

- **Muhamad Alfito Santosa** - [@alfitosantosa](https://github.com/alfitosantosa)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
