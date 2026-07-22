"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { CategorySummary } from "@/types/category";

interface CategoryCardProps {
  category: CategorySummary;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={`/categories/${category.slug}`}
        className="group relative block overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          {category.image ? (
            <Image
              src={category.image.url}
              alt={category.image.alt}
              fill
              sizes="(min-width: 1024px) 19vw, (min-width: 768px) 24vw, (min-width: 640px) 32vw, 45vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <h3 className="line-clamp-1 font-heading text-sm font-semibold text-white sm:text-base">
            {category.title}
          </h3>
          {category.description ? (
            <p className="line-clamp-1 hidden text-xs text-white/80 sm:block">
              {category.description}
            </p>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
