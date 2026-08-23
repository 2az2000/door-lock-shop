export interface MediaAsset {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
  /** Tiny inlined base64 preview generated at upload time, or null for older uploads. */
  blurDataURL: string | null;
}
