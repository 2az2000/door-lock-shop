/**
 * Neutral 16×16 WebP used as the blur placeholder for uploads that predate the
 * generated preview. Inlined so it costs no request.
 */
export const FALLBACK_BLUR_DATA_URL =
  "data:image/webp;base64,UklGRigAAABXRUJQVlA4IBwAAABQAQCdASoQABAAA4BaJZwABAAAAP7x/0eo4AAA";

/** `sizes` presets, so every grid ships an accurate value instead of `100vw`. */
export const IMAGE_SIZES = {
  /** Product / category / article cards in the standard 4-column grid. */
  CARD: "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 45vw, 50vw",
  /** Half-width feature images (product gallery, company intro). */
  HALF: "(min-width: 1024px) 50vw, 100vw",
  /** Full-bleed banners. */
  FULL: "100vw",
} as const;
