FROM node:lts-alpine AS base

FROM base AS deps
WORKDIR /workspace-install
COPY package.json package-lock.json ./
RUN npm i

FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /workspace-install ./
RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/vite.config.ts .
COPY --from=builder /app/index.html .
COPY --from=builder /app/dist ./dist
RUN npm init -y --silent
# I'd like to read the versions from package.json to ensure compatibility
RUN npm i -S vite @vitejs/plugin-react vite-tsconfig-paths
RUN npm pkg set scripts.start="vite preview --port 3001 --host"

EXPOSE 3001
CMD ["npm", "start"]