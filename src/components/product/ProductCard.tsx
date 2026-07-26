"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { ProductSummary } from "@/types/product";
import { formatPrice } from "@/utils/format-price";

const GRID_SIZES = "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 45vw, 50vw";

interface ProductCardProps {
  product: ProductSummary;
  sizes?: string;
}

export function ProductCard({ product, sizes = GRID_SIZES }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Link
        id={`product-card-${product.slug}`}
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-foreground/10 transition-shadow hover:shadow-md"
      >
        <div
          id={`product-card-image-${product.slug}`}
          className="relative aspect-square overflow-hidden"
        >
          {product.featuredImage ? (
            <div className="absolute inset-2 overflow-hidden rounded-xl">
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.alt}
                fill
                sizes={sizes}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : null}
          {product.category ? (
            <span
              id={`product-card-category-${product.slug}`}
              className="absolute text-white bg-['#00000069'] top-4 right-4 z-10 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm"
            >
              {product.category.title}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
          <h3 className="line-clamp-1 font-heading text-sm font-semibold text-foreground sm:text-base">
            {product.title}
          </h3>
          {/* {product.shortDescription ? (
            <p className="line-clamp-2 hidden text-sm text-muted-foreground sm:block">
              {product.shortDescription}
            </p>
          ) : null} */}
          <span
            id={`product-card-price-${product.slug}`}
            className="mt-auto border-t border-border pt-2 text-base font-bold text-primary"
          >
            {formatPrice(product.price, product.priceLabel)}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
