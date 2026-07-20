
# پلن پیاده‌سازی

بررسی وضعیت فعلی مخزن: پروژه هم‌اکنون فقط یک اسکلت پیش‌فرض `create-next-app` به‌همراه نصب `shadcn/ui` است. هیچ ساختار `src/`، هیچ Payload CMS، هیچ پایگاه‌داده، هیچ تنظیمات فونت فارسی/RTL، هیچ صفحه‌ای فراتر از `/` پیش‌فرض، و هیچ کامپوننت بیزینسی وجود ندارد. وابستگی‌های فرانت‌اند (TailwindCSS v4، shadcn/ui، Framer Motion، React Hook Form، Zod، next-themes، lucide-react) در `package.json` نصب شده‌اند اما بقیهٔ موارد ذکرشده در AGENTS.md باید از صفر ساخته شوند.

**فاز ۰ — زیرساخت: بازآرایی به `src/` + راست‌به‌چپ (RTL) + فونت وزیرمتن + توکن‌های تم**
انتقال `app/`، `components/`، `lib/` به داخل `src/`؛ ایجاد پوشه‌های خالی `src/{features,services,hooks,types,utils,styles,constants,providers,actions}/`؛ به‌روزرسانی مسیرهای `tsconfig.json` و `components.json` (`rtl: true`، مسیرهای alias)؛ تنظیم `lang="fa"` و `dir="rtl"` در `src/app/layout.tsx`؛ جایگزینی فونت Geist با وزیرمتن؛ جایگزینی توکن‌های پیش‌فرض OKLCH در `globals.css` با پالت خنثای پروژه و مقادیر پیش‌فرض گوشه‌های گرد.
*تکمیل‌شده وقتی:* سرور توسعه صفحهٔ پیش‌فرض را به فارسی و راست‌به‌چپ با تم جدید نمایش دهد؛ build با موفقیت اجرا شود؛ دیگر `app/`، `components/`، `lib/` در ریشهٔ مخزن وجود نداشته باشد.

**فاز ۱ — نصب Payload CMS، اتصال به Postgres، تنظیم متغیرهای محیطی**
نصب `payload`، `@payloadcms/next`، `@payloadcms/db-postgres`، `@payloadcms/richtext-lexical`، `sharp`؛ افزودن route handlerهای Next مخصوص Payload زیر `src/app/(payload)/`؛ ایجاد `payload.config.ts` در ریشه به‌همراه پوشه‌های خالی `payload/{collections,globals,hooks,access,fields,utils}/`؛ افزودن `.env.local` (در gitignore، شامل `DATABASE_URI`/`PAYLOAD_SECRET`) و `.env.example` که کامیت می‌شود؛ مستندسازی راه‌اندازی Postgres محلی در README.
*تکمیل‌شده وقتی:* مسیر `/admin` بالا بیاید، به Postgres متصل شود، و بتوان اولین کاربر ادمین را ساخت.

**فاز ۲ — طراحی اسکیمای Payload: کالکشن‌ها، گلوبال‌ها، دسترسی‌ها، فیلدها**
تعریف `payload/collections/Products.ts` (تمام فیلدهای مدل محصول طبق AGENTS.md)، `Categories.ts`، `Media.ts` (آپلود مبتنی بر Sharp)، `Brands.ts`؛ `payload/globals/SiteSettings.ts` (طبق فهرست تنظیمات سایت در AGENTS.md)؛ `payload/access/*` (خواندن عمومی / نوشتن فقط برای ادمین)؛ `payload/fields/*` برای تنظیمات مشترک (اسلاگ، گروه سئو)؛ `payload/hooks/*` (تولید خودکار اسلاگ). ثبت همهٔ این‌ها در `payload.config.ts`.
*تکمیل‌شده وقتی:* پنل ادمین همهٔ کالکشن‌ها/گلوبال را با فیلدهای درست نشان دهد؛ دستور `payload generate:types` با موفقیت اجرا شود؛ بتوان یک نمونه دسته‌بندی/محصول/رسانه/تنظیمات سایت را به‌صورت دستی ساخت.

**فاز ۳ — لایهٔ سرویس تایپ‌شده (`src/services/` + `src/types/`)**
تعریف دستی DTOها در `src/types/` که از تایپ‌های خام Payload مستقل باشند؛ `src/lib/payload-client.ts` که Local API پیلود را با کش/ISR بسته‌بندی می‌کند؛ `src/services/{products,categories,brands,site-settings}.service.ts` با توابع پرس‌وجو (`getProducts(filters)`, `getProductBySlug`, `getFeaturedProducts`, `getRelatedProducts`, `getCategories`, `getCategoryBySlug`, `getBrands`, `getSiteSettings`) به‌همراه توابع نگاشت از داده خام به DTO. رابط کاربری هرگز نباید مستقیماً با Payload تماس بگیرد.
*تکمیل‌شده وقتی:* یک کامپوننت سرور آزمایشی بتواند همهٔ توابع سرویس را فراخوانی کرده و داده‌ای با تایپ درست و نگاشت‌شده دریافت کند.

**فاز ۴ — دادهٔ نمونه (Seed)**
`payload/utils/seed.ts` (به‌همراه اسکریپت `npm run seed`) برای درج ۴ تا ۶ دسته‌بندی، ۳ تا ۴ برند، ۱۵ تا ۲۰ محصول با تصاویر نمونه، و یک رکورد کامل تنظیمات سایت.
*تکمیل‌شده وقتی:* توابع لایهٔ سرویس برای همهٔ حالت‌های فیلتر/مرتب‌سازی/صفحه‌بندی نتایج واقعی و غیرخالی برگردانند.

**فاز ۵ — زیرساخت لایه‌بندی و رابط کاربری مشترک**
`src/components/layout/{Header,Footer,MobileNav,Container}.tsx` با استفاده از `site-settings.service.ts`؛ `src/components/common/{Breadcrumb,SectionHeading,EmptyState}.tsx`؛ نهایی‌سازی `src/providers/theme-provider.tsx`؛ اتصال Header/Footer به `src/app/layout.tsx`.
*تکمیل‌شده وقتی:* همهٔ مسیرها هدر/فوتر را با داده‌های واقعی (تلفن، آدرس، شبکه‌های اجتماعی) نمایش دهند؛ منوی موبایل و breadcrumb به‌درستی در حالت راست‌به‌چپ کار کنند.

**فاز ۶ — صفحهٔ فهرست دسته‌بندی‌ها + کامپوننت‌های کارت محصول/دسته‌بندی**
`src/components/product/ProductCard.tsx`، `src/components/category/CategoryCard.tsx` (افکت هاور با Framer Motion، حداکثر ۳۰۰ میلی‌ثانیه)؛ `src/app/(site)/categories/page.tsx` و `src/app/(site)/categories/[slug]/page.tsx`.
*تکمیل‌شده وقتی:* هر دو مسیر داده‌های seed را با `next/image` بهینه‌شده و گرید واکنش‌گرای راست‌به‌چپ نمایش دهند.

**فاز ۷ — صفحهٔ فهرست محصولات (جستجو، فیلتر، مرتب‌سازی، صفحه‌بندی)**
`src/app/(site)/products/page.tsx` که `searchParams` را می‌خواند؛ `src/components/product/ProductFilters.tsx` (کلاینت، نوشتن در URL params)، `ProductGrid.tsx`، `src/components/common/Pagination.tsx`؛ نمایش قیمت با در نظر گرفتن مقدار جایگزین `priceLabel`.
*تکمیل‌شده وقتی:* جستجو/فیلتر دسته‌بندی/فیلتر برند/مرتب‌سازی/صفحه‌بندی همگی از طریق پارامترهای قابل اشتراک‌گذاری URL و به‌صورت سرور-رندر کار کنند.

**فاز ۸ — صفحهٔ جزئیات محصول**
`src/app/(site)/products/[slug]/page.tsx` (فراخوانی `notFound()` برای محصول یافت‌نشده یا منتشرنشده)؛ `src/components/product/{ProductGallery(embla),ProductSpecs,ProductInfo,RelatedProducts}.tsx`؛ `src/components/common/ContactCTA.tsx` (لینک‌های تماس/واتساپ، بدون فرآیند خرید)؛ breadcrumb به شکل خانه ← دسته‌بندی ← محصول.
*تکمیل‌شده وقتی:* صفحهٔ محصول کامل با داده‌های seed رندر شود، گالری با کیبورد قابل‌دسترس باشد، محصولات مرتبط درست نمایش داده شوند، لینک‌های CTA کار کنند.

**فاز ۹ — صفحهٔ اصلی + صفحهٔ تماس با ما**
`src/app/(site)/page.tsx` که بخش‌های Hero/دسته‌بندی‌ها/محصولات ویژه/معرفی شرکت/چرا ما را انتخاب کنید/برندها/جدیدترین محصولات/تماس را از طریق `src/features/home/*.tsx` می‌سازد؛ `src/app/(site)/contact/page.tsx` با `src/features/contact/ContactForm.tsx` (React Hook Form + Zod + سرور اکشن در `src/actions/contact.action.ts`)، نقشه/ساعات کاری/شبکه‌های اجتماعی از تنظیمات سایت.
*تکمیل‌شده وقتی:* هر دو صفحه کاملاً داده‌محور، واکنش‌گرا، درست از نظر راست‌به‌چپ بودن، و با انیمیشن‌های ورودی ملایم باشند.

**فاز ۱۰ — سئو، متادیتا، سایت‌مپ، robots، داده‌های ساختاریافته**
`generateMetadata()` برای هر مسیر (عنوان/توضیحات/canonical/OG/Twitter، با بازگشت به مقادیر پیش‌فرض سئوی تنظیمات سایت در صورت نبود مقدار اختصاصی)؛ `src/app/sitemap.ts`، `src/app/robots.ts`؛ توابع کمکی JSON-LD در `src/utils/structured-data.ts` برای Organization، Product، BreadcrumbList.
*تکمیل‌شده وقتی:* سایت‌مپ شامل تمام اسلاگ‌های منتشرشده باشد؛ هر صفحه متادیتای کامل داشته باشد؛ داده‌های ساختاریافته معتبر باشند؛ مسیر `/admin` در robots.txt غیرمجاز شده باشد.

**فاز ۱۱ — پرداخت نهایی: صیقل‌کاری، دسترس‌پذیری، عملکرد**
بررسی alt متن‌ها/فوکوس/کنتراست رنگ؛ بررسی مرزهای `"use client"`؛ افزودن `loading.tsx`/`error.tsx`/`not-found.tsx` برای هر مسیر؛ بازبینی نهایی بصری راست‌به‌چپ در همهٔ صفحات؛ به‌روزرسانی README با راهنمای راه‌اندازی؛ رساندن امتیاز Lighthouse به بالای ۹۰.
*تکمیل‌شده وقتی:* همهٔ موارد چک‌لیست «تعریف انجام‌شدن» در AGENTS.md تأیید شوند؛ `npm run build && npm run lint` بدون خطا و با TypeScript سخت‌گیرانه و بدون `any` اجرا شود.
