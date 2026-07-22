"use client";

import { SlidersHorizontal } from "lucide-react";

import { ProductFiltersSidebar } from "@/components/product/ProductFiltersSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Brand } from "@/types/brand";
import type { CategorySummary } from "@/types/category";

interface ProductFiltersMobileProps {
  categories: CategorySummary[];
  brands: Brand[];
  materials: string[];
}

export function ProductFiltersMobile({ categories, brands, materials }: ProductFiltersMobileProps) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" className="md:hidden" />}>
        <SlidersHorizontal className="size-4" />
        فیلترها
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 overflow-y-auto sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>فیلترها</SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4">
          <ProductFiltersSidebar
            categories={categories}
            brands={brands}
            materials={materials}
            idPrefix="mobile-"
            variant="plain"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
