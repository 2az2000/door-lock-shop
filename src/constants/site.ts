// `NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` is injected by Vercel at build
// time, so the first deploy already emits correct canonical/OG/sitemap URLs
// before `NEXT_PUBLIC_SITE_URL` is set to the final domain.
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");
