import type { Metadata } from "next";

import { ArticleFilters } from "@/components/article/ArticleFilters";
import { ArticleGrid } from "@/components/article/ArticleGrid";
import { Pagination } from "@/components/common/Pagination";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { getArticleCategories } from "@/services/article-categories.service";
import { getArticles } from "@/services/articles.service";

const TITLE = "مقالات";
const DESCRIPTION = "راهنمای خرید، اخبار و نکات فنی درباره‌ی قفل، دستگیره و یراق‌آلات درب";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/articles" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/articles", type: "website" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

interface ArticlesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;

  const search = firstValue(params.q);
  const categorySlug = firstValue(params.category);
  const page = Number(firstValue(params.page)) || 1;

  const [categories, result] = await Promise.all([
    getArticleCategories(),
    getArticles({ search, categorySlug, page, limit: 12 }),
  ]);

  const buildHref = (targetPage: number) => {
    const next = new URLSearchParams();
    if (search) next.set("q", search);
    if (categorySlug) next.set("category", categorySlug);
    if (targetPage > 1) next.set("page", String(targetPage));
    const qs = next.toString();
    return qs ? `/articles?${qs}` : "/articles";
  };

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="وبلاگ" title={TITLE} description={DESCRIPTION} />

      <div className="mt-8">
        <ArticleFilters categories={categories} />
      </div>

      <ArticleGrid
        articles={result.docs}
        emptyTitle="مقاله‌ای یافت نشد"
        emptyDescription="با تغییر فیلترها یا حذف عبارت جستجو دوباره امتحان کنید."
      />

      <div className="mt-10">
        <Pagination currentPage={result.page} totalPages={result.totalPages} buildHref={buildHref} />
      </div>
    </Container>
  );
}
