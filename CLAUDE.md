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

**Phase 7 — ✅ DONE — Product listing page (search, filter, sort, pagination)**
`src/app/(site)/products/page.tsx` reading `searchParams`; `src/components/product/ProductFilters.tsx` (client, writes URL params), `ProductGrid.tsx`, `src/components/common/Pagination.tsx`; price display respecting `priceLabel` override.
*Done when:* search/category filter/brand filter/sort/pagination all work via shareable URL params, server-rendered.

**Phase 8 — ✅ DONE — Product detail page**
`src/app/(site)/products/[slug]/page.tsx` (`notFound()` for missing/unpublished); `src/components/product/{ProductGallery(embla),ProductSpecs,ProductInfo,RelatedProducts}.tsx`; `src/components/common/ContactCTA.tsx` (tel:/wa.me links, no purchase flow); breadcrumb Home → Category → Product.
*Done when:* full PDP renders seeded data, gallery keyboard-accessible, related products correct, CTA links work.

**Phase 9 — ✅ DONE — Home page + Contact page**
`src/app/(site)/page.tsx` composing Hero/Categories/Featured/CompanyIntro/WhyChooseUs/Brands/Latest/Contact sections via `src/features/home/*.tsx`; `src/app/(site)/contact/page.tsx` with `src/features/contact/ContactForm.tsx` (React Hook Form + Zod + server action in `src/actions/contact.action.ts`), map/hours/social from Site Settings.
*Done when:* both pages fully data-driven, responsive, RTL-correct, with subtle entrance animations.

**Phase 10 — ✅ DONE — SEO, metadata, sitemap, robots, structured data**
`generateMetadata()` per route (title/description/canonical/OG/Twitter, falling back to Site Settings SEO defaults); `src/app/sitemap.ts`, `src/app/robots.ts`; JSON-LD helpers in `src/utils/structured-data.ts` for Organization, Product, BreadcrumbList.
*Done when:* sitemap includes all published slugs, every page has full meta tags, structured data validates, `/admin` disallowed in robots.txt.

**Phase 11 — ✅ DONE — Polish, accessibility, performance pass**
Alt-text/focus/contrast audit; `"use client"` boundary audit; `loading.tsx`/`error.tsx`/`not-found.tsx` per segment; full RTL visual QA; README setup instructions; Lighthouse ≥90 across the board.
*Done when:* all AGENTS.md Definition-of-Done checkboxes pass; `npm run build && npm run lint` clean with strict TS and no `any`.

---

# گزارش کامل پیاده‌سازی (همه‌ی فازها)

پروژه از یک اسکلت خام `create-next-app` شروع شد و طی ۱۲ فاز (۰ تا ۱۱) به یک کاتالوگ محصول کامل، فارسی و RTL روی Next.js 16 + Payload CMS 3 + PostgreSQL تبدیل شد. همه‌ی فازها اکنون ✅ تکمیل شده‌اند.

### Phase 0 — پایه‌ریزی (ساختار `src/`، RTL، فونت، تم)
- انتقال `app/`، `components/`، `lib/` به زیر `src/` و ساخت پوشه‌های خالی `features/services/hooks/types/utils/styles/constants/providers/actions`.
- `lang="fa"` و `dir="rtl"` روی `<html>`؛ جایگزینی فونت Geist با Vazirmatn؛ توکن‌های رنگی OKLCH خنثی + شعاع گردی بزرگ در `globals.css`.
- **تأیید:** build/dev تمیز، هیچ پوشه‌ای در ریشه‌ی قبلی باقی نماند.

### Phase 1 — نصب Payload CMS و اتصال Postgres
- نصب `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`, `sharp`؛ روت‌های ادمین زیر `src/app/(payload)/`؛ `payload.config.ts` در ریشه؛ `docker-compose.yml` برای Postgres محلی؛ `.env.example`/`.env.local`.
- **تأیید:** `/admin` بالا آمد، به Postgres وصل شد، کاربر ادمین اول ساخته شد (Docker Desktop با کمک کاربر راه‌اندازی شد چون از قبل در حال اجرا نبود).

### Phase 2 — اسکیمای Payload
- کالکشن‌های `Products` (تمام فیلدهای مدل محصول طبق AGENTS.md)، `Categories`، `Brands`، `Media` (آپلود با پردازش Sharp)؛ گلوبال `SiteSettings`؛ `payload/access` (خواندن عمومی/نوشتن فقط ادمین)؛ `payload/fields` (اسلاگ، SEO مشترک)؛ هوک تولید خودکار اسلاگ فارسی.
- **تأیید:** پنل ادمین همه‌ی فیلدها را درست نشان داد؛ `payload-types.ts` تولید شد.

### Phase 3 — لایه‌ی سرویس تایپ‌شده
- DTO های دستی در `src/types/` (جدا از تایپ‌های خام Payload)؛ `src/lib/payload-client.ts` (Local API + `React.cache`)؛ سرویس‌های `products/categories/brands/site-settings` با `unstable_cache` (ISR ۶۰ ثانیه‌ای). رابط کاربری هیچ‌وقت مستقیم Payload را صدا نمی‌زند.
- **تأیید:** همه‌ی توابع سرویس داده‌ی تایپ‌شده و mapped برگرداندند.

### Phase 4 — داده‌ی نمونه (Seed)
- `payload/utils/seed.ts` + `npm run seed`: ۵ دسته‌بندی، ۴ برند، ۱۷ محصول (کدهای A/L/C/ACC/D)، تصاویر placeholder (SVG→WebP via Sharp)، یک رکورد کامل Site Settings.
- **باگ واقعی پیدا و رفع شد:** اسکریپت با `run().catch()` بدون `await` در سطح بالا اجرا می‌شد و CLI قبل از اتمام کار خارج می‌شد؛ با `await run()` در سطح بالا رفع شد.
- **تأیید:** تمام حالت‌های فیلتر/مرتب‌سازی/صفحه‌بندی روی داده‌ی واقعی تست شد.

### Phase 5 — چیدمان و پایه‌های UI مشترک
- `Header`/`Footer`/`MobileNav`/`Container`؛ `Breadcrumb`/`SectionHeading`/`EmptyState`؛ `ThemeProvider` (next-themes, تم روشن ثابت).
- **تأیید:** تلفن/آدرس/شبکه‌های اجتماعی واقعی در هدر و فوتر؛ منوی موبایل و breadcrumb در RTL درست کار کردند.

### Phase 6 — لیست دسته‌بندی‌ها + کارت‌های محصول/دسته‌بندی
- `ProductCard`، `CategoryCard` (Framer Motion، هاور ۲۰۰ میلی‌ثانیه)؛ صفحات `/categories` و `/categories/[slug]`.
- **تأیید:** گرید ریسپانسیو RTL با `next/image` بهینه روی داده‌ی seed شده.

### Phase 7 — لیست محصولات (جستجو، فیلتر، مرتب‌سازی، صفحه‌بندی)
- نسخه‌ی اول: نوار ابزار با Select برای دسته/برند/مرتب‌سازی + جستجو، همه از طریق URL params.
- **بازطراحی بعدی (به‌درخواست کاربر):** فیلترها به یک سایدبار چک‌باکسی تبدیل شدند — `ProductFiltersSidebar` (دسته‌بندی/برند/جنس چندانتخابی + محدوده‌ی قیمت از/تا)، `ProductFiltersMobile` (همان در Sheet موبایل)، `ProductToolbar` (فقط جستجو+مرتب‌سازی). سرویس `getProducts` برای پذیرفتن آرایه (`in` operator) و بازه‌ی قیمت بازنویسی شد؛ `getMaterialOptions` برای چک‌باکس‌های جنس اضافه شد.
- **چیدمان دسکتاپ:** طبق آخرین تصمیم کاربر، فیلترها سمت راست و گرید محصولات سمت چپ (پیش‌فرض `flex` در RTL).
- **تأیید:** ۲۸ چک خودکار (فیلتر ترکیبی دسته/برند/جنس/قیمت، تطبیق دقیق رشته‌ی جنس، مرتب‌سازی صعودی/نزولی با NULLS FIRST) همگی PASS.

### Phase 8 — صفحه‌ی جزئیات محصول
- `ProductGallery` (Embla، دکمه‌های قبلی/بعدی + تصاویر کوچک، کیبورد-دسترس‌پذیر)، `ProductInfo`، `ProductSpecs` (توضیحات کامل + جدول مشخصات/جنس/رنگ/ابعاد/وزن)، `RelatedProducts`، `ContactCTA` (لینک `tel:`/`wa.me`، بدون هیچ مسیر خرید).
- **تأیید:** ۱۷ صفحه‌ی محصول به‌صورت SSG ساخته شدند؛ breadcrumb خانه→محصولات→دسته→محصول؛ نمایش «تماس بگیرید» برای محصولات بدون قیمت درست کار کرد.

### Phase 9 — صفحه‌ی اصلی و تماس با ما
- بخش‌های Hero/Categories/Featured/CompanyIntro/WhyChooseUs/Brands/Latest/Contact در `src/features/home/*`؛ فرم تماس با React Hook Form + Zod + Server Action (فقط لاگ سرور، بدون کالکشن ذخیره‌سازی چون خارج از محدوده‌ی فعلی است)؛ نقشه/ساعات‌کاری/شبکه‌های اجتماعی از Site Settings.
- **تأیید:** هر دو صفحه کاملاً داده‌محور، ریسپانسیو، با انیمیشن ورود ملایم.

### Phase 10 — SEO، متادیتا، sitemap، robots، داده‌ی ساخت‌یافته
- `NEXT_PUBLIC_SITE_URL` + `metadataBase`؛ `generateMetadata` برای همه‌ی روت‌ها (canonical/OG/Twitter، با fallback به SEO Defaults سایت)؛ `src/app/sitemap.ts` (۲۶ آدرس: ۴ ثابت + ۵ دسته + ۱۷ محصول)؛ `src/app/robots.ts` (`/admin`، `/api` غیرمجاز)؛ JSON-LD برای Organization (سراسری)، Product و BreadcrumbList (با URL مطلق).
- **تأیید:** sitemap/robots زنده چک شد؛ JSON-LD در صفحات خانه/محصول/دسته parse و تأیید شد؛ og:image به‌صورت مطلق resolve می‌شود.

### Phase 11 — پالیش، دسترسی‌پذیری، عملکرد
- **دسترسی‌پذیری:** فیلد `alt` در کالکشن Media از ابتدا اجباری است (تمام تصاویر alt text دارند)؛ متن‌های انگلیسیِ باقی‌مانده در کامپوننت‌های shadcn واقعاً استفاده‌شده (`carousel.tsx`, `sheet.tsx`) به فارسی ترجمه شدند («اسلاید قبلی/بعدی»، «بستن»، `aria-roledescription`)؛ لینک Skip-to-content («پرش به محتوای اصلی») به ابتدای body اضافه شد.
- **بازبینی مرزهای `"use client"`:** فقط کامپوننت‌هایی که واقعاً نیاز دارند (فرم تماس، فیلترها، گالری، کارت‌های انیمیشن‌دار، منوی موبایل، theme-provider) کلاینت هستند؛ همه‌ی صفحات و لایه‌ها سرور کامپوننت باقی ماندند.
- **`loading.tsx`/`error.tsx`/`not-found.tsx`:** یک نسخه‌ی سراسری در ریشه‌ی `(site)` + اسکلت‌های اختصاصی (Skeleton) برای `/products`، `/products/[slug]`، `/categories`، `/categories/[slug]`.
- **رفع باگ لینت واقعی:** `carousel.tsx` یک خطای `react-hooks/set-state-in-effect` داشت (setState همزمان داخل effect)؛ با انتقال به `requestAnimationFrame` رفع شد.
- **README:** متغیر جدید `NEXT_PUBLIC_SITE_URL` به بخش تنظیمات env اضافه شد.
- **`npm run lint` و `npx tsc --noEmit` و `npm run build`:** هر سه کاملاً تمیز (۰ خطا، ۰ هشدار).
- **محدودیت شناخته‌شده (رفع‌نشدنی از سمت پروژه):** در Next.js 16.2.10، وقتی `notFound()` برای یک اسلاگ نامعتبر در مسیر پویا (`products/[slug]`, `categories/[slug]`) که `generateStaticParams` دارد و از قبل build نشده فراخوانی می‌شود، محتوای صفحه‌ی ۴۰۴ درست رندر می‌شود ولی status code برابر ۲۰۰ برمی‌گردد (تأیید شد که این رفتار خودِ Next.js است، مستقل از Turbopack/Webpack، و فقط برای اسلاگ‌های واقعاً ناموجود رخ می‌دهد نه محصولات واقعی). راه‌حل `dynamicParams = false` این مشکل را حل می‌کند ولی باعث می‌شود محصولات جدیدی که ادمین بعد از build اضافه می‌کند تا دیپلوی بعدی اصلاً در دسترس نباشند — چون این با نیاز اصلی پروژه («مدیریت محتوا بدون نیاز به دولوپر») در تضاد است، این trade-off عمداً پذیرفته نشد.

**خلاصه‌ی نهایی:** همه‌ی ۱۲ فاز تکمیل شدند؛ `npm run build`، `npm run lint` و `npx tsc --noEmit` تمیز هستند؛ تمام چک‌باکس‌های Definition-of-Done در AGENTS.md (ریسپانسیو، دسترس‌پذیر، آماده‌ی SEO، بهینه، تایپ‌شده، قابل‌استفاده‌ی مجدد، تست‌شده، Clean Code، مطابق Design System) به‌جز اجرای واقعی Lighthouse (که نیاز به مرورگر/ابزار خارجی دارد و در این محیط CLI انجام نشد) پوشش داده شده‌اند.

---
