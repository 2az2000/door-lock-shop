"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useRef } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SliderProps {
  children: ReactNode;
  itemClassName?: string;
  className?: string;
}

export function Slider({ children, itemClassName, className }: SliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 sm:gap-4"
      >
        {Children.map(children, (child) => (
          <div
            className={cn(
              "shrink-0 snap-start basis-[45%] sm:basis-[32%] md:basis-[24%] lg:basis-[19%]",
              itemClassName,
            )}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-4 hidden justify-end gap-2 sm:flex">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => scrollByAmount(-1)}
          aria-label="مورد قبلی"
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => scrollByAmount(1)}
          aria-label="مورد بعدی"
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>
    </div>
  );
}
