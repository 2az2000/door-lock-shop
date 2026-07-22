import { unstable_cache } from "next/cache";
import type { Where } from "payload";

import { toMediaAsset } from "@/lib/media";
import { getPayloadClient } from "@/lib/payload-client";
import { toRelationSummary } from "@/lib/relations";
import type { ArticleDetail, ArticleSummary } from "@/types/article";
import type { PaginatedResult } from "@/types/pagination";
import type { Article } from "@payload-types";

export interface ArticleFilters {
  search?: string;
  categorySlug?: string;
  page?: number;
  limit?: number;
}

const toArticleSummary = (article: Article): ArticleSummary => ({
  id: article.id,
  title: article.title,
  slug: article.slug,
  excerpt: article.excerpt ?? null,
  featuredImage: toMediaAsset(article.featuredImage),
  category: toRelationSummary(article.category),
  author: article.author ?? null,
  publishedAt: article.publishedAt ?? null,
  featured: article.featured ?? false,
});

const toArticleDetail = async (article: Article): Promise<ArticleDetail> => {
  let contentHtml: string | null = null;

  if (article.content) {
    const { convertLexicalToHTMLAsync } = await import("@payloadcms/richtext-lexical/html-async");
    contentHtml = await convertLexicalToHTMLAsync({ data: article.content });
  }

  return {
    ...toArticleSummary(article),
    contentHtml,
    tags: article.tags ?? [],
    seoTitle: article.seoTitle ?? null,
    seoDescription: article.seoDescription ?? null,
  };
};

const getArticlesUncached = async (
  filters: ArticleFilters = {},
): Promise<PaginatedResult<ArticleSummary>> => {
  const payload = await getPayloadClient();

  const and: Where[] = [{ published: { equals: true } }];

  if (filters.categorySlug) {
    and.push({ "category.slug": { equals: filters.categorySlug } });
  }

  if (filters.search) {
    and.push({
      or: [
        { title: { contains: filters.search } },
        { excerpt: { contains: filters.search } },
      ],
    });
  }

  const result = await payload.find({
    collection: "articles",
    where: { and },
    sort: "-publishedAt",
    page: filters.page ?? 1,
    limit: filters.limit ?? 12,
    depth: 1,
  });

  return {
    docs: result.docs.map(toArticleSummary),
    page: result.page ?? 1,
    totalPages: result.totalPages,
    totalDocs: result.totalDocs,
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
  };
};

const getArticleBySlugUncached = async (slug: string): Promise<ArticleDetail | null> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "articles",
    where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
    limit: 1,
    depth: 1,
  });

  const doc = result.docs[0];
  return doc ? await toArticleDetail(doc) : null;
};

const getFeaturedArticlesUncached = async (limit = 8): Promise<ArticleSummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "articles",
    where: { and: [{ published: { equals: true } }, { featured: { equals: true } }] },
    sort: "-publishedAt",
    limit,
    depth: 1,
  });

  return result.docs.map(toArticleSummary);
};

const getLatestArticlesUncached = async (limit = 8): Promise<ArticleSummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "articles",
    where: { published: { equals: true } },
    sort: "-publishedAt",
    limit,
    depth: 1,
  });

  return result.docs.map(toArticleSummary);
};

const getRelatedArticlesUncached = async (
  articleId: number,
  categoryId: number,
  limit = 3,
): Promise<ArticleSummary[]> => {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "articles",
    where: {
      and: [
        { published: { equals: true } },
        { category: { equals: categoryId } },
        { id: { not_equals: articleId } },
      ],
    },
    sort: "-publishedAt",
    limit,
    depth: 1,
  });

  return result.docs.map(toArticleSummary);
};

export const getArticles = unstable_cache(getArticlesUncached, ["articles", "list"], {
  revalidate: 60,
  tags: ["articles"],
});

export const getArticleBySlug = unstable_cache(getArticleBySlugUncached, ["articles", "by-slug"], {
  revalidate: 60,
  tags: ["articles"],
});

export const getFeaturedArticles = unstable_cache(
  getFeaturedArticlesUncached,
  ["articles", "featured"],
  { revalidate: 60, tags: ["articles"] },
);

export const getLatestArticles = unstable_cache(getLatestArticlesUncached, ["articles", "latest"], {
  revalidate: 60,
  tags: ["articles"],
});

export const getRelatedArticles = unstable_cache(
  getRelatedArticlesUncached,
  ["articles", "related"],
  { revalidate: 60, tags: ["articles"] },
);
