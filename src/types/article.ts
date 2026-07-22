import type { MediaAsset } from "./media";
import type { RelationSummary } from "./product";

export interface ArticleCategorySummary {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  order: number;
}

export interface ArticleSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: MediaAsset | null;
  category: RelationSummary | null;
  author: string | null;
  publishedAt: string | null;
  featured: boolean;
}

export interface ArticleDetail extends ArticleSummary {
  contentHtml: string | null;
  tags: string[];
  seoTitle: string | null;
  seoDescription: string | null;
}
