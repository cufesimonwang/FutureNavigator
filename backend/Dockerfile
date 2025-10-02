FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* tsconfig.json ./
RUN npm install --legacy-peer-deps

COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/package.json /app/package-lock.json* ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
