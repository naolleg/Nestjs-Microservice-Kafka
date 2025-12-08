FROM docker.io/node:lts-alpine

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./
COPY apps/gateway/package.json ./apps/gateway/
COPY tsconfig*.json ./

# Install dependencies (including devDependencies because we need typescript)
RUN npm ci

# Copy source code
COPY apps/gateway ./apps/gateway

# Build the gateway app
WORKDIR /app/apps/gateway
RUN npx tsc -p tsconfig.app.json

# Prune dev dependencies for smaller final image (optional but recommended)
RUN npm prune --production

# Final working directory and command
WORKDIR /app/apps/gateway

# Most common case: outDir: "./dist" → file is dist/main.js
# If your tsconfig outputs to dist/app/main.js, change the CMD accordingly

ENV NODE_ENV=production
ENV PORT=3000
ENV KAFKA_BROKER=kafka:9092

EXPOSE 3000

# Correct path (99% of NestJS/Nx projects)
CMD ["node", "dist/main.js"]

# If your tsconfig really outputs to dist/app/main.js, use this instead:
# CMD ["node", "dist/app/main.js"]