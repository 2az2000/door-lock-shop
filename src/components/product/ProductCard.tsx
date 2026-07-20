"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ProductSummary } from "@/types/product";
import { formatPrice } from "@/utils/format-price";

interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-4">
          {product.category ? (
            <span className="text-xs font-medium text-muted-foreground">{product.category.title}</span>
          ) : null}
          <h3 className="line-clamp-1 font-heading text-base font-semibold text-foreground">
            {product.title}
          </h3>
          {product.shortDescription ? (
            <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
          ) : null}
          <span className="mt-auto pt-2 text-sm font-semibold text-foreground">
            {formatPrice(product.price, product.priceLabel)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
