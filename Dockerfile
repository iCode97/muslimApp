# Multi-stage build for MuslimApp
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV HOST=0.0.0.0
ENV PORT=3000
# Runtime data (Web Push subscribers in /app/.data/push). Mount a volume here
# so subscriptions survive container rebuilds (see docker-compose.yml).
RUN mkdir -p /app/.data/push
VOLUME ["/app/.data"]
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
