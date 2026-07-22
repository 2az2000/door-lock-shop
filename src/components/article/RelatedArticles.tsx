import { ArticleGrid } from "@/components/article/ArticleGrid";
import { SectionHeading } from "@/components/common/SectionHeading";
import type { ArticleSummary } from "@/types/article";

interface RelatedArticlesProps {
  articles: ArticleSummary[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section>
      <SectionHeading title="مقالات مرتبط" />
      <ArticleGrid articles={articles} />
    </section>
  );
}
