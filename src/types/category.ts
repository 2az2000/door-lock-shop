import type { MediaAsset } from "./media";

export interface CategorySummary {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: MediaAsset | null;
  order: number;
}
