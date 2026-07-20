import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CategoryCard } from "@/components/category/CategoryCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { CategorySummary } from "@/types/category";

interface CategoriesSectionProps {
  categories: CategorySummary[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="کاتالوگ محصولات"
            title="دسته‌بندی‌ها"
            description="محصولات را بر اساس دسته‌بندی مرور کنید."
          />
          <Button variant="outline" nativeButton={false} render={<Link href="/categories" />}>
            مشاهده همه
            <ArrowLeft className="size-4" />
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
