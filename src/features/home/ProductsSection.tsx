import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Slider } from "@/components/common/Slider";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import type { ProductSummary } from "@/types/product";

interface ProductsSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  products: ProductSummary[];
  viewAllHref?: string;
}

export function ProductsSection({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
}: ProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          {viewAllHref ? (
            <Button variant="outline" nativeButton={false} render={<Link href={viewAllHref} />}>
              مشاهده همه
              <ArrowLeft className="size-4" />
            </Button>
          ) : null}
        </div>
        <Slider className="mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      </Container>
    </section>
  );
}
