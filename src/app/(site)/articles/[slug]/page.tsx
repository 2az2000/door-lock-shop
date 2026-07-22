import type { Metadata } from "next";
import { Calendar, Tag, User } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleContent } from "@/components/article/ArticleContent";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { JsonLd } from "@/components/common/JsonLd";
import { Container } from "@/components/layout/Container";
import { getArticleBySlug, getArticles, getRelatedArticles } from "@/services/articles.service";
import { formatDate } from "@/utils/format-date";
import { articleJsonLd, breadcrumbJsonLd } from "@/utils/structured-data";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles({ limit: 100 });
  return articles.docs.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title,
      description,
      url: `/articles/${article.slug}`,
      type: "article",
      ...(article.featuredImage ? { images: [{ url: article.featuredImage.url }] } : {}),
    },
    twitter: { title, description },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.category
    ? await getRelatedArticles(article.id, article.category.id, 3)
    : [];

  const date = formatDate(article.publishedAt);

  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "مقالات", href: "/articles" },
    ...(article.category
      ? [{ label: article.category.title, href: `/articles?category=${article.category.slug}` }]
      : []),
    { label: article.title },
  ];

  return (
    <Container className="py-12 sm:py-16">
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <div className="mx-auto mt-6 max-w-3xl">
        <div className="space-y-4">
          {article.category ? (
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {article.category.title}
            </span>
          ) : null}
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border pb-5 text-sm text-muted-foreground">
            {article.author ? (
              <span className="flex items-center gap-1.5">
                <User className="size-3.5" aria-hidden="true" />
                {article.author}
              </span>
            ) : null}
            {date ? (
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" aria-hidden="true" />
                {date}
              </span>
            ) : null}
          </div>
        </div>

        {article.featuredImage ? (
          <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-foreground/10">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        {article.contentHtml ? (
          <div className="mt-8">
            <ArticleContent html={article.contentHtml} />
          </div>
        ) : null}

        {article.tags.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border pt-6">
            <Tag className="size-4 text-muted-foreground" aria-hidden="true" />
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-16">
        <RelatedArticles articles={relatedArticles} />
      </div>
    </Container>
  );
}
