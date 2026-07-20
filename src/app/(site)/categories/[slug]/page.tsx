import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { EmptyState } from "@/components/common/EmptyState";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { getCategories, getCategoryBySlug } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) return {};

  return {
    title: category.title,
    description: category.description ?? undefined,
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts({ categorySlug: slug, limit: 24 });

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumb
        items={[
          { label: "خانه", href: "/" },
          { label: "دسته‌بندی‌ها", href: "/categories" },
          { label: category.title },
        ]}
      />

      <div className="mt-4 space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {category.title}
        </h1>
        {category.description ? (
          <p className="max-w-2xl text-muted-foreground">{category.description}</p>
        ) : null}
      </div>

      {products.docs.length === 0 ? (
        <EmptyState
          title="محصولی یافت نشد"
          description="در حال حاضر محصولی در این دسته‌بندی ثبت نشده است."
          className="mt-8"
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.docs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}
