import { ArticleCard } from "@/components/article/ArticleCard";
import { EmptyState } from "@/components/common/EmptyState";
import type { ArticleSummary } from "@/types/article";

interface ArticleGridProps {
  articles: ArticleSummary[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ArticleGrid({
  articles,
  emptyTitle = "مقاله‌ای یافت نشد",
  emptyDescription = "با تغییر فیلترها دوباره امتحان کنید.",
}: ArticleGridProps) {
  if (articles.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} className="mt-8" />;
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
