import type { Media } from "@payload-types";
import type { MediaAsset } from "@/types/media";

export const toMediaAsset = (
  value: number | Media | null | undefined,
): MediaAsset | null => {
  if (!value || typeof value === "number") return null;

  // An upload row without a URL is unusable — treat it as missing so the UI
  // renders its placeholder instead of a broken <img>.
  if (!value.url) return null;

  return {
    url: value.url,
    alt: value.alt,
    width: value.width ?? null,
    height: value.height ?? null,
    blurDataURL: value.blurDataURL ?? null,
  };
};
