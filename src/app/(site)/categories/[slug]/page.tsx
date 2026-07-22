import type { Metadata } from "next";
import Image from "next/image";
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

      {category.image ? (
        <div className="relative mt-4 aspect-2/1 overflow-hidden rounded-2xl shadow-sm ring-1 ring-foreground/10 sm:aspect-3/1">
          <Image
            src={category.image.url}
            alt={category.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <h1 className="font-heading text-2xl font-semibold text-white sm:text-3xl">
              {category.title}
            </h1>
            {category.description ? (
              <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
                {category.description}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {category.title}
          </h1>
          {category.description ? (
            <p className="max-w-2xl text-muted-foreground">{category.description}</p>
          ) : null}
        </div>
      )}

      <ProductGrid
        products={products.docs}
        emptyTitle="محصولی یافت نشد"
        emptyDescription="در حال حاضر محصولی در این دسته‌بندی ثبت نشده است."
      />
    </Container>
  );
}
