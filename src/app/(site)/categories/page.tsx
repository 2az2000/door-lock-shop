import type { Metadata } from "next";

import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryCard } from "@/components/category/CategoryCard";
import { Container } from "@/components/layout/Container";
import { getCategories } from "@/services/categories.service";

export const metadata: Metadata = {
  title: "دسته‌بندی محصولات",
  description: "دسته‌بندی‌های محصولات قفل، دستگیره و یراق‌آلات درب",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading
        eyebrow="کاتالوگ محصولات"
        title="دسته‌بندی‌ها"
        description="محصولات را بر اساس دسته‌بندی مرور کنید."
      />

      {categories.length === 0 ? (
        <EmptyState
          title="دسته‌بندی‌ای یافت نشد"
          description="در حال حاضر دسته‌بندی‌ای برای نمایش وجود ندارد."
          className="mt-8"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </Container>
  );
}
