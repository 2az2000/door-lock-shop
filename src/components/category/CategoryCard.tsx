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
        className="group block overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-muted">
          {category.image ? (
            <Image
              src={category.image.url}
              alt={category.image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="space-y-1 p-4">
          <h3 className="font-heading text-base font-semibold text-foreground">{category.title}</h3>
          {category.description ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
