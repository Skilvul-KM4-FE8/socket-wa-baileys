# Stage 1: Build
FROM node:20-alpine as builder

WORKDIR /app

# Install dependencies including build tools (python, make, g++)
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install production dependencies saja
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Buat user dan group khusus
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    mkdir -p /app/auth && \
    chown -R appuser:appgroup /app

# Salin dari builder stage
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup . .

# Set permission khusus untuk folder auth
RUN chmod 777 /app/auth

# Switch ke non-root user
USER appuser

# Expose port yang digunakan
EXPOSE 4567

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:4567/ || exit 1

# Jalankan aplikasi
CMD ["node", "server.js"]