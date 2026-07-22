"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ArticleSummary } from "@/types/article";
import { formatDate } from "@/utils/format-date";

interface ArticleCardProps {
  article: ArticleSummary;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const date = formatDate(article.publishedAt);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={`/articles/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt}
              fill
              sizes="(min-width: 1024px) 19vw, (min-width: 768px) 24vw, (min-width: 640px) 32vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
          {article.category ? (
            <span className="text-xs font-medium text-primary">{article.category.title}</span>
          ) : null}
          <h3 className="line-clamp-2 font-heading text-sm font-semibold text-foreground sm:text-base">
            {article.title}
          </h3>
          {article.excerpt ? (
            <p className="line-clamp-2 hidden text-sm text-muted-foreground sm:block">
              {article.excerpt}
            </p>
          ) : null}
          <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
            {article.author ? <span>{article.author}</span> : null}
            {article.author && date ? <span aria-hidden="true">·</span> : null}
            {date ? <span>{date}</span> : null}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
