import { SITE_URL } from "@/constants/site";
import type { ProductDetail } from "@/types/product";
import type { SiteSettings } from "@/types/site-settings";

function absoluteUrl(url: string): string {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function organizationJsonLd(siteSettings: SiteSettings) {
  const sameAs = [siteSettings.instagram, siteSettings.telegram].filter(
    (url): url is string => Boolean(url),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSettings.companyName,
    url: SITE_URL,
    ...(siteSettings.logo ? { logo: absoluteUrl(siteSettings.logo.url) } : {}),
    ...(siteSettings.phone ? { telephone: siteSettings.phone } : {}),
    ...(siteSettings.address ? { address: { "@type": "PostalAddress", streetAddress: siteSettings.address } } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function productJsonLd(product: ProductDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.shortDescription ?? undefined,
    image: [product.featuredImage, ...product.gallery]
      .filter((asset): asset is NonNullable<typeof asset> => Boolean(asset))
      .map((asset) => absoluteUrl(asset.url)),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand.title } } : {}),
    ...(product.price != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "IRR",
            price: product.price,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/products/${product.slug}`,
          },
        }
      : {}),
  };
}

export interface BreadcrumbJsonLdItem {
  label: string;
  href?: string;
}

export function breadcrumbJsonLd(items: BreadcrumbJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}
