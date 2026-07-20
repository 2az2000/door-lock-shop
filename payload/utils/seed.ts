import type { Payload } from "payload";
import { getPayload } from "payload";
import sharp from "sharp";

import config from "../../payload.config";

type LexicalParagraph = ReturnType<typeof toRichText>;

function toRichText(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text, version: 1 }],
          direction: "rtl" as const,
          format: "" as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: "rtl" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

const createPlaceholderImage = async (label: string, color: string): Promise<Buffer> => {
  const svg = `
    <svg width="1200" height="900" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="900" fill="${color}"/>
      <text x="600" y="450" font-size="64" fill="#ffffff" text-anchor="middle"
        dominant-baseline="middle" font-family="Arial, sans-serif">${label}</text>
    </svg>
  `;
  return sharp(Buffer.from(svg)).png().toBuffer();
};

interface CategorySeed {
  key: string;
  title: string;
  slug: string;
  description: string;
  color: string;
  order: number;
}

const categorySeeds: CategorySeed[] = [
  {
    key: "door-handles",
    title: "دستگیره در",
    slug: "door-handles",
    description: "دستگیره‌های در داخلی و خارجی با طراحی متنوع و جنس‌های باکیفیت",
    color: "#8a7458",
    order: 1,
  },
  {
    key: "door-locks",
    title: "قفل در",
    slug: "door-locks",
    description: "انواع قفل مکانیکی و ضدسرقت برای درهای چوبی و فلزی",
    color: "#4a5a6a",
    order: 2,
  },
  {
    key: "lock-cylinders",
    title: "سیلندر قفل",
    slug: "lock-cylinders",
    description: "سیلندرهای استاندارد و ضدسرقت سازگار با انواع قفل",
    color: "#6a6a6a",
    order: 3,
  },
  {
    key: "door-accessories",
    title: "لوازم جانبی در",
    slug: "door-accessories",
    description: "زبانه، کفی، بازویی و سایر ملزومات نصب درب",
    color: "#7a6a8a",
    order: 4,
  },
  {
    key: "digital-locks",
    title: "قفل دیجیتال",
    slug: "digital-locks",
    description: "قفل‌های هوشمند اثرانگشتی، کارتی و رمزی برای درهای مدرن",
    color: "#2f3e46",
    order: 5,
  },
];

interface BrandSeed {
  key: string;
  title: string;
  slug: string;
}

const brandSeeds: BrandSeed[] = [
  { key: "hafele", title: "هافله", slug: "hafele" },
  { key: "kohler", title: "کوهلر", slug: "kohler" },
  { key: "yale", title: "یال", slug: "yale" },
  { key: "mul-t-lock", title: "مولتی‌لاک", slug: "mul-t-lock" },
];

interface ProductSeed {
  title: string;
  slug: string;
  categoryKey: string;
  brandKey: string;
  price?: number;
  priceLabel?: string;
  colors: string[];
  materials: string[];
  dimensions: string;
  weight: string;
  specifications: { label: string; value: string }[];
  featured?: boolean;
}

const productSeeds: ProductSeed[] = [
  {
    title: "دستگیره کلاسیک استیل مدل A100",
    slug: "classic-steel-handle-a100",
    categoryKey: "door-handles",
    brandKey: "hafele",
    price: 890000,
    colors: ["نقره‌ای"],
    materials: ["استیل ضدزنگ"],
    dimensions: "22×4×3 سانتی‌متر",
    weight: "320 گرم",
    specifications: [
      { label: "جنس", value: "استیل ضدزنگ" },
      { label: "نوع نصب", value: "پیچی" },
    ],
    featured: true,
  },
  {
    title: "دستگیره مدرن مشکی مات مدل A200",
    slug: "modern-matte-black-handle-a200",
    categoryKey: "door-handles",
    brandKey: "kohler",
    price: 1150000,
    colors: ["مشکی مات"],
    materials: ["آلومینیوم"],
    dimensions: "24×4×3 سانتی‌متر",
    weight: "280 گرم",
    specifications: [
      { label: "جنس", value: "آلومینیوم" },
      { label: "پوشش", value: "مات ضدخط‌وخش" },
    ],
  },
  {
    title: "دستگیره لوکس طلایی مدل A300",
    slug: "luxury-gold-handle-a300",
    categoryKey: "door-handles",
    brandKey: "yale",
    priceLabel: "تماس بگیرید",
    colors: ["طلایی"],
    materials: ["برنج"],
    dimensions: "23×4×3 سانتی‌متر",
    weight: "350 گرم",
    specifications: [{ label: "جنس", value: "برنج آبکاری‌شده" }],
  },
  {
    title: "دستگیره برنجی کلاسیک مدل A400",
    slug: "classic-brass-handle-a400",
    categoryKey: "door-handles",
    brandKey: "mul-t-lock",
    price: 990000,
    colors: ["برنزه"],
    materials: ["برنج"],
    dimensions: "22×4×3 سانتی‌متر",
    weight: "340 گرم",
    specifications: [{ label: "جنس", value: "برنج توپر" }],
    featured: true,
  },
  {
    title: "قفل درب ضدسرقت مدل L100",
    slug: "anti-theft-door-lock-l100",
    categoryKey: "door-locks",
    brandKey: "mul-t-lock",
    price: 2450000,
    colors: ["مشکی"],
    materials: ["فولاد"],
    dimensions: "قابل نصب روی درهای استاندارد",
    weight: "1.2 کیلوگرم",
    specifications: [
      { label: "تعداد زبانه", value: "۳ زبانه" },
      { label: "استاندارد", value: "ضدسرقت" },
    ],
    featured: true,
  },
  {
    title: "قفل درب مکانیکی مدل L200",
    slug: "mechanical-door-lock-l200",
    categoryKey: "door-locks",
    brandKey: "yale",
    price: 1650000,
    colors: ["نقره‌ای"],
    materials: ["فولاد"],
    dimensions: "قابل نصب روی درهای استاندارد",
    weight: "950 گرم",
    specifications: [{ label: "تعداد زبانه", value: "۲ زبانه" }],
  },
  {
    title: "قفل درب استاندارد مدل L300",
    slug: "standard-door-lock-l300",
    categoryKey: "door-locks",
    brandKey: "hafele",
    priceLabel: "تماس بگیرید",
    colors: ["نقره‌ای"],
    materials: ["فولاد"],
    dimensions: "قابل نصب روی درهای استاندارد",
    weight: "870 گرم",
    specifications: [{ label: "تعداد زبانه", value: "۱ زبانه" }],
  },
  {
    title: "سیلندر قفل ۵ پین مدل C100",
    slug: "5-pin-lock-cylinder-c100",
    categoryKey: "lock-cylinders",
    brandKey: "mul-t-lock",
    price: 650000,
    colors: ["نقره‌ای"],
    materials: ["برنج"],
    dimensions: "طول استاندارد ۶۰ میلی‌متر",
    weight: "120 گرم",
    specifications: [{ label: "تعداد پین", value: "۵ پین" }],
  },
  {
    title: "سیلندر قفل ضدسرقت مدل C200",
    slug: "anti-theft-cylinder-c200",
    categoryKey: "lock-cylinders",
    brandKey: "yale",
    price: 890000,
    colors: ["مشکی"],
    materials: ["برنج", "فولاد"],
    dimensions: "طول استاندارد ۷۰ میلی‌متر",
    weight: "140 گرم",
    specifications: [{ label: "استاندارد", value: "ضدسرقت / ضدکپی" }],
    featured: true,
  },
  {
    title: "سیلندر قفل توپیجی مدل C300",
    slug: "knob-cylinder-c300",
    categoryKey: "lock-cylinders",
    brandKey: "hafele",
    price: 540000,
    colors: ["نقره‌ای"],
    materials: ["برنج"],
    dimensions: "طول استاندارد ۵۵ میلی‌متر",
    weight: "110 گرم",
    specifications: [{ label: "نوع", value: "توپیجی" }],
  },
  {
    title: "زبانه درب استیل مدل ACC100",
    slug: "steel-door-latch-acc100",
    categoryKey: "door-accessories",
    brandKey: "hafele",
    price: 320000,
    colors: ["نقره‌ای"],
    materials: ["استیل"],
    dimensions: "60 میلی‌متر",
    weight: "90 گرم",
    specifications: [{ label: "جنس", value: "استیل ضدزنگ" }],
  },
  {
    title: "کفی درب مدل ACC200",
    slug: "door-strike-plate-acc200",
    categoryKey: "door-accessories",
    brandKey: "kohler",
    price: 180000,
    colors: ["نقره‌ای"],
    materials: ["فولاد"],
    dimensions: "استاندارد",
    weight: "60 گرم",
    specifications: [{ label: "نوع نصب", value: "پیچی" }],
  },
  {
    title: "بازویی درب مدل ACC300",
    slug: "door-closer-arm-acc300",
    categoryKey: "door-accessories",
    brandKey: "hafele",
    price: 750000,
    colors: ["نقره‌ای", "مشکی"],
    materials: ["آلومینیوم"],
    dimensions: "قابل تنظیم",
    weight: "1.1 کیلوگرم",
    specifications: [{ label: "کاربرد", value: "بازوی نگهدارنده در" }],
  },
  {
    title: "قفل دیجیتال اثرانگشتی مدل D100",
    slug: "fingerprint-digital-lock-d100",
    categoryKey: "digital-locks",
    brandKey: "yale",
    price: 4200000,
    colors: ["مشکی", "نقره‌ای"],
    materials: ["آلیاژ روی", "استیل"],
    dimensions: "قابل نصب روی درهای استاندارد",
    weight: "1.8 کیلوگرم",
    specifications: [
      { label: "روش باز شدن", value: "اثرانگشت / رمز / کارت" },
      { label: "باتری", value: "۴ عدد قلمی" },
    ],
    featured: true,
  },
  {
    title: "قفل دیجیتال کارتی مدل D200",
    slug: "card-digital-lock-d200",
    categoryKey: "digital-locks",
    brandKey: "kohler",
    price: 3600000,
    colors: ["نقره‌ای"],
    materials: ["آلیاژ روی"],
    dimensions: "قابل نصب روی درهای استاندارد",
    weight: "1.6 کیلوگرم",
    specifications: [{ label: "روش باز شدن", value: "کارت / رمز" }],
  },
  {
    title: "قفل دیجیتال رمزی مدل D300",
    slug: "keypad-digital-lock-d300",
    categoryKey: "digital-locks",
    brandKey: "mul-t-lock",
    price: 3100000,
    colors: ["مشکی"],
    materials: ["آلیاژ روی"],
    dimensions: "قابل نصب روی درهای استاندارد",
    weight: "1.5 کیلوگرم",
    specifications: [{ label: "روش باز شدن", value: "رمز عددی" }],
  },
  {
    title: "قفل دیجیتال هوشمند وایفای مدل D400",
    slug: "smart-wifi-digital-lock-d400",
    categoryKey: "digital-locks",
    brandKey: "yale",
    priceLabel: "تماس بگیرید",
    colors: ["مشکی", "نقره‌ای"],
    materials: ["آلیاژ روی", "استیل"],
    dimensions: "قابل نصب روی درهای استاندارد",
    weight: "1.9 کیلوگرم",
    specifications: [
      { label: "روش باز شدن", value: "اثرانگشت / اپلیکیشن / رمز" },
      { label: "اتصال", value: "Wi-Fi و بلوتوث" },
    ],
    featured: true,
  },
];

const buildShortDescription = (product: ProductSeed, category: CategorySeed): string =>
  `${product.title} از دسته ${category.title}، ساخته‌شده از ${product.materials.join(" و ")} با کیفیت بالا و طراحی متناسب با درهای مدرن.`;

const buildFullDescription = (product: ProductSeed, category: CategorySeed): LexicalParagraph =>
  toRichText(
    `${product.title} یکی از محصولات باکیفیت مجموعه ${category.title} است. این محصول با استفاده از ${product.materials.join(
      " و ",
    )} تولید شده و برای استفاده طولانی‌مدت و روزمره مناسب است. ابعاد: ${product.dimensions}، وزن: ${product.weight}.`,
  );

async function clearCollections(payload: Payload) {
  payload.logger.info("Clearing existing catalog data...");
  await payload.delete({ collection: "products", where: { id: { exists: true } } });
  await payload.delete({ collection: "categories", where: { id: { exists: true } } });
  await payload.delete({ collection: "brands", where: { id: { exists: true } } });
  await payload.delete({ collection: "media", where: { id: { exists: true } } });
}

async function seedMedia(payload: Payload): Promise<Record<string, number>> {
  payload.logger.info("Creating placeholder images...");
  const mediaByKey: Record<string, number> = {};

  for (const category of categorySeeds) {
    const buffer = await createPlaceholderImage(category.slug.toUpperCase(), category.color);
    const doc = await payload.create({
      collection: "media",
      data: { alt: `تصویر ${category.title}` },
      file: {
        data: buffer,
        mimetype: "image/png",
        name: `${category.slug}.png`,
        size: buffer.length,
      },
    });
    mediaByKey[category.key] = doc.id;
  }

  const brandLogoBuffer = await createPlaceholderImage("BRAND", "#9a9a9a");
  const brandLogoDoc = await payload.create({
    collection: "media",
    data: { alt: "لوگوی برند" },
    file: {
      data: brandLogoBuffer,
      mimetype: "image/png",
      name: "brand-logo.png",
      size: brandLogoBuffer.length,
    },
  });
  mediaByKey.brandLogo = brandLogoDoc.id;

  return mediaByKey;
}

async function seedCategories(
  payload: Payload,
  mediaByKey: Record<string, number>,
): Promise<Record<string, number>> {
  payload.logger.info("Creating categories...");
  const categoryIds: Record<string, number> = {};

  for (const category of categorySeeds) {
    const doc = await payload.create({
      collection: "categories",
      data: {
        title: category.title,
        slug: category.slug,
        description: category.description,
        image: mediaByKey[category.key],
        order: category.order,
      },
    });
    categoryIds[category.key] = doc.id;
  }

  return categoryIds;
}

async function seedBrands(
  payload: Payload,
  mediaByKey: Record<string, number>,
): Promise<Record<string, number>> {
  payload.logger.info("Creating brands...");
  const brandIds: Record<string, number> = {};

  for (const brand of brandSeeds) {
    const doc = await payload.create({
      collection: "brands",
      data: {
        title: brand.title,
        slug: brand.slug,
        logo: mediaByKey.brandLogo,
      },
    });
    brandIds[brand.key] = doc.id;
  }

  return brandIds;
}

async function seedProducts(
  payload: Payload,
  categoryIds: Record<string, number>,
  brandIds: Record<string, number>,
  mediaByKey: Record<string, number>,
) {
  payload.logger.info("Creating products...");

  for (const product of productSeeds) {
    const category = categorySeeds.find((c) => c.key === product.categoryKey);
    if (!category) continue;

    const featuredImageId = mediaByKey[product.categoryKey];

    await payload.create({
      collection: "products",
      data: {
        title: product.title,
        slug: product.slug,
        shortDescription: buildShortDescription(product, category),
        fullDescription: buildFullDescription(product, category),
        category: categoryIds[product.categoryKey],
        brand: brandIds[product.brandKey],
        featuredImage: featuredImageId,
        gallery: [{ image: featuredImageId }],
        price: product.price ?? null,
        priceLabel: product.priceLabel ?? null,
        specifications: product.specifications,
        colors: product.colors,
        materials: product.materials,
        dimensions: product.dimensions,
        weight: product.weight,
        featured: product.featured ?? false,
        published: true,
        seoTitle: `${product.title} | قفل و دستگیره ایران`,
        seoDescription: buildShortDescription(product, category),
      },
    });
  }
}

async function seedSiteSettings(payload: Payload, mediaByKey: Record<string, number>) {
  payload.logger.info("Updating site settings...");
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      companyName: "قفل و دستگیره ایران",
      logo: mediaByKey.brandLogo,
      phone: "021-12345678",
      mobile: "0912-1234567",
      whatsapp: "989121234567",
      email: "info@doorlockshop.test",
      address: "تهران، خیابان ولیعصر، نبش کوچه بهار",
      googleMap: "https://maps.google.com/?q=Tehran",
      instagram: "https://instagram.com/doorlockshop",
      telegram: "https://t.me/doorlockshop",
      workingHours: [
        { day: "شنبه تا چهارشنبه", hours: "9:00 - 18:00" },
        { day: "پنجشنبه", hours: "9:00 - 13:00" },
      ],
      footerText: "کلیه حقوق این وب‌سایت متعلق به فروشگاه قفل و دستگیره ایران است.",
      seoDefaults: {
        seoTitle: "قفل و دستگیره ایران | فروش انواع قفل، دستگیره و یراق‌آلات درب",
        seoDescription: "کاتالوگ آنلاین محصولات قفل، دستگیره، سیلندر و لوازم جانبی درب با کیفیت بالا.",
      },
    },
  });
}

async function run() {
  const payload = await getPayload({ config });

  await clearCollections(payload);
  const mediaByKey = await seedMedia(payload);
  const categoryIds = await seedCategories(payload, mediaByKey);
  const brandIds = await seedBrands(payload, mediaByKey);
  await seedProducts(payload, categoryIds, brandIds, mediaByKey);
  await seedSiteSettings(payload, mediaByKey);

  payload.logger.info(
    `Seed complete: ${categorySeeds.length} categories, ${brandSeeds.length} brands, ${productSeeds.length} products.`,
  );
}

// Top-level await: `payload run` resolves its dynamic import() as soon as
// this module's synchronous body finishes, so without awaiting here it would
// move on (and the CLI would exit) before the seeding work ever completed.
try {
  await run();
  process.exit(0);
} catch (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}
