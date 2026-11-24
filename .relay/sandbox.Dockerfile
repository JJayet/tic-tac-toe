# Builds the app and serves it with `next start` on $PORT, any host name.
FROM node:22-slim AS build
WORKDIR /app
RUN npm install -g bun@1
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM node:22-slim
ENV NODE_ENV=production PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /app ./
USER node
HEALTHCHECK --interval=2s --timeout=3s --retries=30 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"
CMD ["sh", "-c", "exec node_modules/.bin/next start -H 0.0.0.0 -p \"$PORT\""]
