import type { MediaAsset } from "./media";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface RelationSummary {
  id: number;
  title: string;
  slug: string;
}

export interface ProductSummary {
  id: number;
  title: string;
  slug: string;
  shortDescription: string | null;
  featuredImage: MediaAsset | null;
  price: number | null;
  priceLabel: string | null;
  category: RelationSummary | null;
  brand: RelationSummary | null;
  featured: boolean;
}

export interface ProductDetail extends ProductSummary {
  fullDescriptionHtml: string | null;
  gallery: MediaAsset[];
  specifications: ProductSpecification[];
  colors: string[];
  materials: string[];
  dimensions: string | null;
  weight: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}
