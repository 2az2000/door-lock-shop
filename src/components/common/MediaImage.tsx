"use client";

import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

import { FALLBACK_BLUR_DATA_URL } from "@/constants/media";
import { cn } from "@/lib/utils";
import type { MediaAsset } from "@/types/media";

interface MediaPlaceholderProps {
  id: string;
  /** Mirrors the `fill` prop of the image it stands in for. */
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  /** Accessible name. Pass "" for decorative slots (thumbnails, logos). */
  label?: string;
}

/**
 * What renders when an image is missing or fails to download: a neutral,
 * theme-aware tile instead of the browser's broken-image glyph.
 */
export function MediaPlaceholder({
  id,
  fill,
  width,
  height,
  className,
  label = "تصویری موجود نیست",
}: MediaPlaceholderProps) {
  return (
    <div
      id={id}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      style={fill ? undefined : { width, height }}
      className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground/60",
        fill && "absolute inset-0",
        className,
      )}
    >
      <ImageOff className="size-[30%] max-h-10 min-h-4 max-w-10 min-w-4" aria-hidden="true" />
    </div>
  );
}

type PassthroughImageProps = Omit<
  ImageProps,
  "src" | "alt" | "placeholder" | "blurDataURL" | "onError" | "id"
>;

interface MediaImageProps extends PassthroughImageProps {
  asset: MediaAsset | null | undefined;
  /** Required so the rendered element can be addressed unambiguously. */
  id: string;
  /** Overrides the asset's own alt text; pass "" for decorative images. */
  alt?: string;
  /** Extra classes for the placeholder shown when the asset is missing/broken. */
  placeholderClassName?: string;
  /** Accessible name of the placeholder. Defaults to the resolved alt text. */
  placeholderLabel?: string;
}

/**
 * The single entry point for CMS imagery.
 *
 * - paints the upload's own base64 preview (or a neutral one) while the file
 *   downloads, so there is no layout flash or blank box;
 * - degrades to `MediaPlaceholder` when the asset is absent *or* the request
 *   fails at runtime (deleted blob, offline CDN);
 * - forwards every other `next/image` prop, so callers keep control of
 *   `fill`/`sizes`/`priority`.
 */
export function MediaImage({
  asset,
  id,
  alt,
  className,
  placeholderClassName,
  placeholderLabel,
  ...imageProps
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const resolvedAlt = alt ?? asset?.alt ?? "";

  if (!asset || failed) {
    return (
      <MediaPlaceholder
        id={`${id}-placeholder`}
        fill={imageProps.fill}
        width={typeof imageProps.width === "number" ? imageProps.width : undefined}
        height={typeof imageProps.height === "number" ? imageProps.height : undefined}
        label={placeholderLabel ?? resolvedAlt}
        className={cn(className, placeholderClassName)}
      />
    );
  }

  return (
    <Image
      id={id}
      src={asset.url}
      alt={resolvedAlt}
      placeholder="blur"
      blurDataURL={asset.blurDataURL ?? FALLBACK_BLUR_DATA_URL}
      onError={() => setFailed(true)}
      className={className}
      {...imageProps}
    />
  );
}
