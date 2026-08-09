FROM node:20-slim
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# This image is the container path (Liara etc.), not the Vercel path. It keeps
# media on the local `staticDir`, so BLOB_READ_WRITE_TOKEN must stay unset here
# and the host must mount a persistent disk at /app/media (see liara.json).
#
# `next build` runs generateStaticParams for products/categories/articles,
# which makes a REAL Postgres connection at build time (not just runtime) —
# confirmed by testing: a placeholder/unreachable DATABASE_URI fails the build
# with ECONNREFUSED. So DATABASE_URI here must point to a real, reachable
# Postgres (the target DB should already exist before the first deploy) and
# must be passed via `--build-arg DATABASE_URI=...` at build/deploy time.
# `npm run ci` applies Payload migrations first, so the schema exists before
# the build queries it.
# PAYLOAD_SECRET only needs to be *present* (not connected to anything) to
# satisfy the config's startup check, so a placeholder is fine here — the
# real secret is set as a separate runtime env var (see `liara env`).
# NEXT_PUBLIC_SITE_URL is inlined into the client bundle at build time, so it
# must be a build arg — a runtime env var alone leaves canonical/OG/sitemap
# URLs pointing at localhost.
ARG PAYLOAD_SECRET=build-time-placeholder-secret
ARG DATABASE_URI
ARG NEXT_PUBLIC_SITE_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run ci

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
