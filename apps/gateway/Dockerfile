FROM node:lts-alpine AS builder

# Enable corepack (includes pnpm)
RUN corepack enable

WORKDIR /app

# Copy root package definitions
COPY package.json pnpm-lock.yaml ./

# Copy gateway package definition
COPY apps/gateway/package.json ./apps/gateway/

# Install dependencies according to lockfile
RUN pnpm install --frozen-lockfile

# Copy the entire monorepo source
COPY . .

# Build only the gateway app
RUN pnpm --filter @microservice/gateway build

# ---- Production Image ----
FROM node:lts-alpine AS runner

RUN corepack enable

WORKDIR /app

# Copy only necessary runtime files from builder
COPY --from=builder /app/apps/gateway/dist ./dist
COPY --from=builder /app/apps/gateway/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=3000
ENV KAFKA_BROKER=kafka:9092

EXPOSE 3000

CMD ["node", "dist/main.js"]
