import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ArticleCard } from "@/components/article/ArticleCard";
import { Slider } from "@/components/common/Slider";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { ArticleSummary } from "@/types/article";

interface ArticlesSectionProps {
  articles: ArticleSummary[];
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="وبلاگ"
            title="آخرین مقالات"
            description="راهنمای خرید، اخبار و نکات فنی درباره‌ی قفل و دستگیره."
          />
          <Button variant="outline" nativeButton={false} render={<Link href="/articles" />}>
            مشاهده همه
            <ArrowLeft className="size-4" />
          </Button>
        </div>
        <Slider className="mt-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Slider>
      </Container>
    </section>
  );
}
