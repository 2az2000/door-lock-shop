import type { MediaAsset } from "./media";

export interface Brand {
  id: number;
  title: string;
  slug: string;
  logo: MediaAsset | null;
}
