# Stage 1: Build
FROM node:20-alpine3.19 AS builder

WORKDIR /app

# Install dependencies including build tools (python, make, g++)
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install hanya production dependencies
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:20-alpine3.19

# Upgrade all packages to fix vulnerabilities
RUN apk upgrade --no-cache

WORKDIR /app

# Buat user dan group khusus
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

# Salin dari builder stage
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup . .

# Switch ke non-root user
USER appuser

# Expose port
EXPOSE 4567

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:4567/ || exit 1

# Jalankan aplikasi
CMD ["node", "server.js"]
