FROM node:20-slim
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# `next build` runs generateStaticParams for products/categories/articles,
# which makes a REAL Postgres connection at build time (not just runtime) —
# confirmed by testing: a placeholder/unreachable DATABASE_URI fails the build
# with ECONNREFUSED. So DATABASE_URI here must point to a real, reachable
# Postgres (the target DB should already exist before the first deploy) and
# must be passed via `--build-arg DATABASE_URI=...` at build/deploy time.
# PAYLOAD_SECRET only needs to be *present* (not connected to anything) to
# satisfy the config's startup check, so a placeholder is fine here — the
# real secret is set as a separate runtime env var (see `liara env`).
ARG PAYLOAD_SECRET=build-time-placeholder-secret
ARG DATABASE_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI

RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
