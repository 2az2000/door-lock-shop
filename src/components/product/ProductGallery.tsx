"use client";

import { useEffect, useState } from "react";

import { MediaImage, MediaPlaceholder } from "@/components/common/MediaImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { IMAGE_SIZES } from "@/constants/media";
import { cn } from "@/lib/utils";
import type { MediaAsset } from "@/types/media";

interface ProductGalleryProps {
  images: MediaAsset[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (images.length === 0) {
    return (
      <MediaPlaceholder
        id="product-gallery-empty"
        label={`تصویری برای ${title} ثبت نشده است`}
        className="aspect-square rounded-2xl"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Carousel setApi={setApi} opts={{ loop: images.length > 1 }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-foreground/10">
                <MediaImage
                  id={`product-gallery-slide-${index}`}
                  asset={image}
                  alt={image.alt || title}
                  fill
                  sizes={IMAGE_SIZES.HALF}
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 ? (
          <>
            <CarouselPrevious className="left-4 bg-background/90 shadow-sm backdrop-blur-sm" />
            <CarouselNext className="right-4 bg-background/90 shadow-sm backdrop-blur-sm" />
          </>
        ) : null}
      </Carousel>

      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`نمایش تصویر ${index + 1} از ${images.length}`}
              aria-current={selected === index}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-lg ring-2 transition-all",
                selected === index
                  ? "ring-primary"
                  : "opacity-70 ring-transparent hover:opacity-100",
              )}
            >
              <MediaImage
                id={`product-gallery-thumb-${index}`}
                asset={image}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
