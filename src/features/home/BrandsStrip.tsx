import Image from "next/image";

import { Container } from "@/components/layout/Container";
import type { Brand } from "@/types/brand";

interface BrandsStripProps {
  brands: Brand[];
}

export function BrandsStrip({ brands }: BrandsStripProps) {
  if (brands.length === 0) return null;

  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <Container>
        <p className="text-center text-sm font-medium text-muted-foreground">برندهای همکار</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-2 text-muted-foreground">
              {brand.logo ? (
                <Image
                  src={brand.logo.url}
                  alt={brand.logo.alt}
                  width={40}
                  height={40}
                  className="size-10 rounded-lg object-contain grayscale transition-all hover:grayscale-0"
                />
              ) : null}
              <span className="text-sm font-medium">{brand.title}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
