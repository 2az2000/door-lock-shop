import { unstable_cache } from "next/cache";
import type { Where } from "payload";

import { toMediaAsset } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload-client";
import { toRelationSummary } from "@/lib/relations";
import type { PaginatedResult } from "@/types/pagination";
import type { ProductDetail, ProductSummary } from "@/types/product";
import type { Product } from "@payload-types";

export type ProductSort = "newest" | "price-asc" | "price-desc";

export interface ProductFilters {
  search?: string;
  categorySlugs?: string[];
  brandSlugs?: string[];
  materials?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

const sortMap: Record<ProductSort, string> = {
  newest: "-createdAt",
  "price-asc": "price",
  "price-desc": "-price",
};

const toProductSummary = (product: Product): ProductSummary => ({
  id: product.id,
  title: product.title,
  slug: product.slug,
  shortDescription: product.shortDescription ?? null,
  featuredImage: toMediaAsset(product.featuredImage),
  price: product.price ?? null,
  priceLabel: product.priceLabel ?? null,
  category: toRelationSummary(product.category),
  brand: toRelationSummary(product.brand),
  featured: product.featured ?? false,
});

const toProductDetail = async (product: Product): Promise<ProductDetail> => {
  let fullDescriptionHtml: string | null = null;

  if (product.fullDescription) {
    const { convertLexicalToHTMLAsync } = await import("@payloadcms/richtext-lexical/html-async");
    fullDescriptionHtml = await convertLexicalToHTMLAsync({ data: product.fullDescription });
  }

  return {
    ...toProductSummary(product),
    fullDescriptionHtml,
    gallery: (product.gallery ?? [])
      .map((item) => toMediaAsset(item.image))
      .filter((asset): asset is NonNullable<typeof asset> => asset !== null),
    specifications: (product.specifications ?? []).map((spec) => ({
      label: spec.label,
      value: spec.value,
    })),
    colors: product.colors ?? [],
    materials: product.materials ?? [],
    dimensions: product.dimensions ?? null,
    weight: product.weight ?? null,
    seoTitle: product.seoTitle ?? null,
    seoDescription: product.seoDescription ?? null,
  };
};

const getProductsUncached = async (
  filters: ProductFilters = {},
): Promise<PaginatedResult<ProductSummary>> => {
  const payload = await getPayloadClient();

  const and: Where[] = [{ published: { equals: true } }];

  if (filters.categorySlugs?.length) {
    and.push({ "category.slug": { in: filters.categorySlugs } });
  }

  if (filters.brandSlugs?.length) {
    and.push({ "brand.slug": { in: filters.brandSlugs } });
  }

  if (filters.materials?.length) {
    and.push({ materials: { in: filters.materials } });
  }

  if (filters.minPrice !== undefined) {
    and.push({ price: { greater_than_equal: filters.minPrice } });
  }

  if (filters.maxPrice !== undefined) {
    and.push({ price: { less_than_equal: filters.maxPrice } });
  }

  if (filters.search) {
    and.push({
      or: [
        { title: { contains: filters.search } },
        { shortDescription: { contains: filters.search } },
      ],
    });
  }

  const result = await payload.find({
    collection: "products",
    where: { and },
    sort: sortMap[filters.sort ?? "newest"],
    page: filters.page ?? 1,
    limit: filters.limit ?? 12,
    depth: 1,
  });

  return {
    docs: result.docs.map(toProductSummary),
    page: result.page ?? 1,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  };
};

const getProductBySlugUncached = async (slug: string): Promise<ProductDetail | null> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
  });

  const doc = result.docs[0];
  return doc ? await toProductDetail(doc) : null;
};

const getFeaturedProductsUncached = async (limit = 8): Promise<ProductSummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: { and: [{ published: { equals: true } }, { featured: { equals: true } }] },
    sort: "-createdAt",
    limit,
    depth: 1,
  });

  return result.docs.map(toProductSummary);
};

const getLatestProductsUncached = async (limit = 8): Promise<ProductSummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: { published: { equals: true } },
    sort: "-createdAt",
    limit,
    depth: 1,
  });

  return result.docs.map(toProductSummary);
};

const getRelatedProductsUncached = async (
  productId: number,
  categoryId: number,
  limit = 4,
): Promise<ProductSummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: {
      and: [
        { published: { equals: true } },
        { category: { equals: categoryId } },
        { id: { not_equals: productId } },
      ],
    },
    limit,
    depth: 1,
  });

  return result.docs.map(toProductSummary);
};

const getMaterialOptionsUncached = async (): Promise<string[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: { published: { equals: true } },
    limit: 200,
    depth: 0,
  });

  const materials = new Set<string>();
  for (const doc of result.docs) {
    for (const material of doc.materials ?? []) {
      materials.add(material);
    }
  }

  return Array.from(materials).sort((a, b) => a.localeCompare(b, "fa"));
};

export const getMaterialOptions = unstable_cache(
  getMaterialOptionsUncached,
  ["products", "materials"],
  { revalidate: 60, tags: ["products"] },
);

export const getProducts = unstable_cache(getProductsUncached, ["products", "list"], {
  revalidate: 60,
  tags: ["products"],
});

export const getProductBySlug = unstable_cache(getProductBySlugUncached, ["products", "by-slug"], {
  revalidate: 60,
  tags: ["products"],
});

export const getFeaturedProducts = unstable_cache(
  getFeaturedProductsUncached,
  ["products", "featured"],
  { revalidate: 60, tags: ["products"] },
);

export const getLatestProducts = unstable_cache(getLatestProductsUncached, ["products", "latest"], {
  revalidate: 60,
  tags: ["products"],
});

export const getRelatedProducts = unstable_cache(
  getRelatedProductsUncached,
  ["products", "related"],
  { revalidate: 60, tags: ["products"] },
);
