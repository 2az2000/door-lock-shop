import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductSummary } from "@/types/product";

interface RelatedProductsProps {
  products: ProductSummary[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section>
      <SectionHeading title="محصولات مرتبط" />
      <ProductGrid products={products} />
    </section>
  );
}
