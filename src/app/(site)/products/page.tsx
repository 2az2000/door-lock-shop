import type { Metadata } from "next";

import { Pagination } from "@/components/common/Pagination";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ProductFiltersMobile } from "@/components/product/ProductFiltersMobile";
import { ProductFiltersSidebar } from "@/components/product/ProductFiltersSidebar";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductToolbar } from "@/components/product/ProductToolbar";
import { getBrands } from "@/services/brands.service";
import { getCategories } from "@/services/categories.service";
import { getMaterialOptions, getProducts, type ProductSort } from "@/services/products.service";

const TITLE = "محصولات";
const DESCRIPTION = "فهرست کامل محصولات قفل، دستگیره و یراق‌آلات درب";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/products" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/products", type: "website" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const SORT_VALUES: ProductSort[] = ["newest", "price-asc", "price-desc"];

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseList(value: string | undefined): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

function parseNumber(value: string | undefined): number | undefined {
  const num = Number(value);
  return value && Number.isFinite(num) ? num : undefined;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const search = firstValue(params.q);
  const categorySlugs = parseList(firstValue(params.category));
  const brandSlugs = parseList(firstValue(params.brand));
  const materials = parseList(firstValue(params.material));
  const minPrice = parseNumber(firstValue(params.minPrice));
  const maxPrice = parseNumber(firstValue(params.maxPrice));
  const sortParam = firstValue(params.sort);
  const sort = SORT_VALUES.includes(sortParam as ProductSort) ? (sortParam as ProductSort) : "newest";
  const page = Number(firstValue(params.page)) || 1;

  const [categories, brands, materialOptions, result] = await Promise.all([
    getCategories(),
    getBrands(),
    getMaterialOptions(),
    getProducts({
      search,
      categorySlugs,
      brandSlugs,
      materials,
      minPrice,
      maxPrice,
      sort,
      page,
      limit: 12,
    }),
  ]);

  const buildHref = (targetPage: number) => {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    if (categorySlugs.length) next.set("category", categorySlugs.join(","));
    if (brandSlugs.length) next.set("brand", brandSlugs.join(","));
    if (materials.length) next.set("material", materials.join(","));
    if (minPrice !== undefined) next.set("minPrice", String(minPrice));
    if (maxPrice !== undefined) next.set("maxPrice", String(maxPrice));
    if (sort !== "newest") next.set("sort", sort);
    if (targetPage > 1) next.set("page", String(targetPage));
    const qs = next.toString();
    return qs ? `/products?${qs}` : "/products";
  };

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="کاتالوگ محصولات"
        title="محصولات"
        description="با استفاده از جستجو و فیلترها، محصول مورد نظر خود را پیدا کنید."
      />

      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        <aside className="hidden md:block md:w-64 md:shrink-0">
          <div className="sticky top-24">
            <ProductFiltersSidebar categories={categories} brands={brands} materials={materialOptions} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <ProductFiltersMobile categories={categories} brands={brands} materials={materialOptions} />
            <div className="sm:flex-1">
              <ProductToolbar />
            </div>
          </div>

          <div className="mt-6">
            <ProductGrid
              products={result.docs}
              emptyTitle="محصولی یافت نشد"
              emptyDescription="با تغییر فیلترها یا حذف عبارت جستجو دوباره امتحان کنید."
            />
          </div>

          <div className="mt-10">
            <Pagination currentPage={result.page} totalPages={result.totalPages} buildHref={buildHref} />
          </div>
        </div>
      </div>
    </Container>
  );
}
