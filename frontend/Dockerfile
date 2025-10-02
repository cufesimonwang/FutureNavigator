FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY tsconfig.json next.config.js next-env.d.ts ./
COPY app ./app
COPY public ./public

RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/package.json /app/package-lock.json* ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/next.config.js ./next.config.js
COPY --from=base /app/public ./public

EXPOSE 3000
CMD ["npm", "run", "start"]
