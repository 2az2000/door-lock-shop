import { unstable_cache } from "next/cache";

import { getPayloadClient } from "@/lib/payload-client";
import type { ArticleCategorySummary } from "@/types/article";
import type { ArticleCategory } from "@payload-types";

const toArticleCategorySummary = (category: ArticleCategory): ArticleCategorySummary => ({
  id: category.id,
  title: category.title,
  slug: category.slug,
  description: category.description ?? null,
  order: category.order ?? 0,
});

const getArticleCategoriesUncached = async (): Promise<ArticleCategorySummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "article-categories",
    sort: "order",
    limit: 100,
    depth: 0,
  });

  return result.docs.map(toArticleCategorySummary);
};

const getArticleCategoryBySlugUncached = async (
  slug: string,
): Promise<ArticleCategorySummary | null> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "article-categories",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });

  const doc = result.docs[0];
  return doc ? toArticleCategorySummary(doc) : null;
};

export const getArticleCategories = unstable_cache(
  getArticleCategoriesUncached,
  ["article-categories", "list"],
  { revalidate: 60, tags: ["article-categories"] },
);

export const getArticleCategoryBySlug = unstable_cache(
  getArticleCategoryBySlugUncached,
  ["article-categories", "by-slug"],
  { revalidate: 60, tags: ["article-categories"] },
);
