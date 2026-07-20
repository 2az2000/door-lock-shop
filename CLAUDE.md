@AGENTS.md

# Implementation Plan

Repo audit (current state): stock `create-next-app` + `shadcn/ui` scaffold. No `src/` restructure, no Payload CMS, no database, no RTL/Persian font setup, no custom pages beyond the default `/`, no business components. Frontend deps (TailwindCSS v4, shadcn/ui, Framer Motion, React Hook Form, Zod, next-themes, lucide-react) are already installed in `package.json`. Everything else described in AGENTS.md is greenfield.

**Phase 0 — ✅ DONE — Foundation: `src/` restructure + RTL + Vazirmatn font + theme tokens**
Move `app/`, `components/`, `lib/` under `src/`; create empty `src/{features,services,hooks,types,utils,styles,constants,providers,actions}/`; update `tsconfig.json` paths and `components.json` (`rtl: true`, aliases); set `lang="fa"` / `dir="rtl"` in `src/app/layout.tsx`; swap Geist for Vazirmatn; replace stock OKLCH tokens in `globals.css` with the project's neutral palette and rounded-corner defaults.
*Done when:* dev server renders default page in Persian/RTL with new theme; build succeeds; no `app/`/`components/`/`lib/` left at repo root.

**Phase 1 — ✅ DONE — Payload CMS install, Postgres wiring, env setup**
Install `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `sharp`; add Payload's Next route handlers under `src/app/(payload)/`; create root `payload.config.ts` plus empty-stub `payload/{collections,globals,hooks,access,fields,utils}/`; add `.env.local` (gitignored, `DATABASE_URI`/`PAYLOAD_SECRET`) and committed `.env.example`; document local Postgres setup in README.
*Done when:* `/admin` boots, connects to Postgres, first admin user can be created.

**Phase 2 — ✅ DONE — Payload schema: collections, globals, access, fields**
Define `payload/collections/Products.ts` (full field set per AGENTS.md's Product Model), `Categories.ts`, `Media.ts` (Sharp-backed uploads), `Brands.ts`; `payload/globals/SiteSettings.ts` (per AGENTS.md's Site Settings list); `payload/access/*` (public read / admin write); `payload/fields/*` shared configs (slug, SEO group); `payload/hooks/*` (slug auto-gen). Register all in `payload.config.ts`.
*Done when:* admin panel shows all collections/global with correct fields; `payload generate:types` succeeds; one sample category/product/media/site-settings entry can be created manually.

**Phase 3 — ✅ DONE — Typed service layer (`src/services/` + `src/types/`)**
Hand-written DTOs in `src/types/` decoupled from raw Payload types; `src/lib/payload-client.ts` wrapping Payload's local API with caching/ISR; `src/services/{products,categories,brands,site-settings}.service.ts` exposing query functions (`getProducts(filters)`, `getProductBySlug`, `getFeaturedProducts`, `getRelatedProducts`, `getCategories`, `getCategoryBySlug`, `getBrands`, `getSiteSettings`) with mapper functions from raw docs → DTOs. UI must never call Payload directly.
*Done when:* a throwaway server component can call every service function and get correctly-typed, mapped data.

**Phase 4 — ✅ DONE — Seed / sample data**
`payload/utils/seed.ts` (+ `npm run seed`) inserting 4–6 categories, 3–4 brands, 15–20 products with placeholder gallery images, and a full Site Settings entry.
*Done when:* service layer functions return realistic non-empty results for all filter/sort/pagination variants.

**Phase 5 — ✅ DONE — Shared layout & UI foundation**
`src/components/layout/{Header,Footer,MobileNav,Container}.tsx` consuming `site-settings.service.ts`; `src/components/common/{Breadcrumb,SectionHeading,EmptyState}.tsx`; finalize `src/providers/theme-provider.tsx`; wire Header/Footer into `src/app/layout.tsx`.
*Done when:* every route renders real header/footer data (phone, address, social); mobile nav and breadcrumb work correctly in RTL.

**Phase 6 — ✅ DONE — Category listing + Product/Category card components**
`src/components/product/ProductCard.tsx`, `src/components/category/CategoryCard.tsx` (Framer Motion hover, ≤300ms); `src/app/(site)/categories/page.tsx` and `src/app/(site)/categories/[slug]/page.tsx`.
*Done when:* both routes render seeded data with optimized `next/image`, responsive RTL grid.

**Phase 7 — ⬜ PENDING — Product listing page (search, filter, sort, pagination)**
`src/app/(site)/products/page.tsx` reading `searchParams`; `src/components/product/ProductFilters.tsx` (client, writes URL params), `ProductGrid.tsx`, `src/components/common/Pagination.tsx`; price display respecting `priceLabel` override.
*Done when:* search/category filter/brand filter/sort/pagination all work via shareable URL params, server-rendered.

**Phase 8 — ⬜ PENDING — Product detail page**
`src/app/(site)/products/[slug]/page.tsx` (`notFound()` for missing/unpublished); `src/components/product/{ProductGallery(embla),ProductSpecs,ProductInfo,RelatedProducts}.tsx`; `src/components/common/ContactCTA.tsx` (tel:/wa.me links, no purchase flow); breadcrumb Home → Category → Product.
*Done when:* full PDP renders seeded data, gallery keyboard-accessible, related products correct, CTA links work.

**Phase 9 — ✅ DONE — Home page + Contact page**
`src/app/(site)/page.tsx` composing Hero/Categories/Featured/CompanyIntro/WhyChooseUs/Brands/Latest/Contact sections via `src/features/home/*.tsx`; `src/app/(site)/contact/page.tsx` with `src/features/contact/ContactForm.tsx` (React Hook Form + Zod + server action in `src/actions/contact.action.ts`), map/hours/social from Site Settings.
*Done when:* both pages fully data-driven, responsive, RTL-correct, with subtle entrance animations.

**Phase 10 — ⬜ PENDING — SEO, metadata, sitemap, robots, structured data**
`generateMetadata()` per route (title/description/canonical/OG/Twitter, falling back to Site Settings SEO defaults); `src/app/sitemap.ts`, `src/app/robots.ts`; JSON-LD helpers in `src/utils/structured-data.ts` for Organization, Product, BreadcrumbList.
*Done when:* sitemap includes all published slugs, every page has full meta tags, structured data validates, `/admin` disallowed in robots.txt.

**Phase 11 — ⬜ PENDING — Polish, accessibility, performance pass**
Alt-text/focus/contrast audit; `"use client"` boundary audit; `loading.tsx`/`error.tsx`/`not-found.tsx` per segment; full RTL visual QA; README setup instructions; Lighthouse ≥90 across the board.
*Done when:* all AGENTS.md Definition-of-Done checkboxes pass; `npm run build && npm run lint` clean with strict TS and no `any`.

---
