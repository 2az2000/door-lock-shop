import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { JsonLd } from "@/components/common/JsonLd";
import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories, getCategoryBySlug } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { breadcrumbJsonLd } from "@/utils/structured-data";

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

  const description = category.description ?? undefined;

  return {
    title: category.title,
    description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: category.title,
      description,
      url: `/categories/${category.slug}`,
      type: "website",
      ...(category.image ? { images: [{ url: category.image.url }] } : {}),
    },
    twitter: { title: category.title, description },
  };
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts({ categorySlugs: [slug], limit: 24 });

  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "دسته‌بندی‌ها", href: "/categories" },
    { label: category.title },
  ];

  return (
    <Container className="py-12 sm:py-16">
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4 space-y-2">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {category.title}
        </h1>
        {category.description ? (
          <p className="max-w-2xl text-muted-foreground">{category.description}</p>
        ) : null}
      </div>

      <ProductGrid
        products={products.docs}
        emptyTitle="محصولی یافت نشد"
        emptyDescription="در حال حاضر محصولی در این دسته‌بندی ثبت نشده است."
      />
    </Container>
  );
}
