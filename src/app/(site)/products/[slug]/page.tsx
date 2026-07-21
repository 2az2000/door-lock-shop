import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { JsonLd } from "@/components/common/JsonLd";
import { Container } from "@/components/layout/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getSiteSettings } from "@/services/site-settings.service";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/services/products.service";
import { breadcrumbJsonLd, productJsonLd } from "@/utils/structured-data";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts({ limit: 100 });
  return products.docs.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  const title = product.seoTitle || product.title;
  const description = product.seoDescription || product.shortDescription || undefined;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `/products/${product.slug}`,
      type: "website",
      ...(product.featuredImage ? { images: [{ url: product.featuredImage.url }] } : {}),
    },
    twitter: { title, description },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [siteSettings, relatedProducts] = await Promise.all([
    getSiteSettings(),
    product.category
      ? getRelatedProducts(product.id, product.category.id, 4)
      : Promise.resolve([]),
  ]);

  const galleryImages = product.featuredImage
    ? [product.featuredImage, ...product.gallery]
    : product.gallery;

  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "محصولات", href: "/products" },
    ...(product.category
      ? [{ label: product.category.title, href: `/categories/${product.category.slug}` }]
      : []),
    { label: product.title },
  ];

  return (
    <Container className="py-12 sm:py-16">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductGallery images={galleryImages} title={product.title} />
        <ProductInfo product={product} siteSettings={siteSettings} />
      </div>

      <div className="mt-16">
        <ProductSpecs product={product} />
      </div>

      <div className="mt-16">
        <RelatedProducts products={relatedProducts} />
      </div>
    </Container>
  );
}
