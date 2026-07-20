Door Lock & Handle Catalog — a Persian/RTL product catalog built with Next.js and Payload CMS 3. See [AGENTS.md](AGENTS.md) for the full spec and [CLAUDE.md](CLAUDE.md) for the phased implementation plan.

## Getting Started

### 1. Start Postgres

The project expects a local Postgres instance. The easiest way is via Docker:

```bash
docker compose up -d
```

This starts Postgres 16 on `localhost:5432` with the credentials already wired up in `.env.example`.

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

`DATABASE_URI` already matches the `docker-compose.yml` defaults. Replace `PAYLOAD_SECRET` with your own random string for anything beyond local development.

### 3. Run the dev server

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Payload admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) — on first run you'll be prompted to create the first admin user.

### 4. Seed sample data (optional)

```bash
npm run seed
```

Clears the products/categories/brands/media collections and repopulates them with realistic Persian sample data (5 categories, 4 brands, 17 products) plus placeholder images and Site Settings, so pages can be built and previewed against real-shaped content before the client enters production data.

### Other useful scripts

```bash
npm run build              # production build
npm run generate:types     # regenerate payload-types.ts from the current collections/globals
npm run generate:importmap # regenerate the Payload admin import map after adding custom admin components
```

## Project structure

- `src/app/(site)` — the public-facing catalog (Persian, RTL)
- `src/app/(payload)` — Payload's admin panel and REST/GraphQL API routes
- `payload/` — Payload collections, globals, access rules, fields, and hooks
- `payload.config.ts` — root Payload configuration (Postgres adapter, Sharp, collections)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
