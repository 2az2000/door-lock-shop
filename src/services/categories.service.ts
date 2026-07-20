import { unstable_cache } from "next/cache";

import { toMediaAsset } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload-client";
import type { CategorySummary } from "@/types/category";
import type { Category } from "@payload-types";

const toCategorySummary = (category: Category): CategorySummary => ({
  id: category.id,
  title: category.title,
  slug: category.slug,
  description: category.description ?? null,
  image: toMediaAsset(category.image),
  order: category.order ?? 0,
});

const getCategoriesUncached = async (): Promise<CategorySummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "categories",
    sort: "order",
    limit: 100,
    depth: 1,
  });

  return result.docs.map(toCategorySummary);
};

const getCategoryBySlugUncached = async (slug: string): Promise<CategorySummary | null> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "categories",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });

  const doc = result.docs[0];
  return doc ? toCategorySummary(doc) : null;
};

export const getCategories = unstable_cache(getCategoriesUncached, ["categories", "list"], {
  revalidate: 60,
  tags: ["categories"],
});

export const getCategoryBySlug = unstable_cache(
  getCategoryBySlugUncached,
  ["categories", "by-slug"],
  { revalidate: 60, tags: ["categories"] },
);
