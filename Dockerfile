# Gunakan image Node.js LTS
FROM node:20

# Buat direktori kerja di dalam container
WORKDIR /app

# Salin dependency list
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file project
COPY . .

# Jalankan server saat container start
CMD ["node", "server.js"]
