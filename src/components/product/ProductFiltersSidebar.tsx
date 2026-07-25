"use client";

import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState, useTransition } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Brand } from "@/types/brand";
import type { CategorySummary } from "@/types/category";

interface ProductFiltersSidebarProps {
  categories: CategorySummary[];
  brands: Brand[];
  materials: string[];
  idPrefix?: string;
  variant?: "card" | "plain";
}

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

function toDigitsOnly(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 1632))
    .replace(/\D/g, "");
}

function formatThousands(digits: string): string {
  return digits ? Number(digits).toLocaleString("en-US") : "";
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-border pt-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-sm font-medium text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function CheckboxRow({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="-mx-1.5 flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors hover:bg-muted/60">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="w-full cursor-pointer text-sm font-normal text-muted-foreground">
        {label}
      </Label>
    </div>
  );
}

export function ProductFiltersSidebar({
  categories,
  brands,
  materials,
  idPrefix = "",
  variant = "card",
}: ProductFiltersSidebarProps) {
  const isCard = variant === "card";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const selectedCategories = parseList(searchParams.get("category"));
  const selectedBrands = parseList(searchParams.get("brand"));
  const selectedMaterials = parseList(searchParams.get("material"));

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    params.delete("page");

    startTransition(() => {
      router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname);
    });
  };

  const toggleValue = (key: string, list: string[], value: string) => {
    const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
    updateParams({ [key]: next.length ? next.join(",") : null });
  };

  useEffect(() => {
    const currentMin = searchParams.get("minPrice") ?? "";
    const currentMax = searchParams.get("maxPrice") ?? "";
    if (minPrice === currentMin && maxPrice === currentMax) return;

    const timeout = setTimeout(() => {
      updateParams({ minPrice: minPrice || null, maxPrice: maxPrice || null });
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  const activeFilterCount =
    selectedCategories.length +
    selectedBrands.length +
    selectedMaterials.length +
    (searchParams.get("minPrice") ? 1 : 0) +
    (searchParams.get("maxPrice") ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key of ["category", "brand", "material", "minPrice", "maxPrice", "page"]) {
      params.delete(key);
    }
    setMinPrice("");
    setMaxPrice("");
    startTransition(() => {
      router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname);
    });
  };

  const priceContent = (
    <div className="flex min-w-0 items-center gap-2">
      <input
        type="text"
        inputMode="numeric"
        dir="ltr"
        placeholder="از"
        value={formatThousands(minPrice)}
        onChange={(event) => setMinPrice(toDigitsOnly(event.target.value))}
        className="w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1.5 text-end text-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <span className="shrink-0 text-xs text-muted-foreground">تا</span>
      <input
        type="text"
        inputMode="numeric"
        dir="ltr"
        placeholder="تا"
        value={formatThousands(maxPrice)}
        onChange={(event) => setMaxPrice(toDigitsOnly(event.target.value))}
        className="w-full min-w-0 rounded-lg border border-input bg-transparent px-3 py-1.5 text-end text-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </div>
  );

  const categoryContent = (
    <div className="flex flex-col gap-2.5">
      {categories.map((category) => (
        <CheckboxRow
          key={category.id}
          id={`${idPrefix}category-${category.slug}`}
          label={category.title}
          checked={selectedCategories.includes(category.slug)}
          onCheckedChange={() => toggleValue("category", selectedCategories, category.slug)}
        />
      ))}
    </div>
  );

  const brandContent = (
    <div className="flex flex-col gap-2.5">
      {brands.map((brand) => (
        <CheckboxRow
          key={brand.id}
          id={`${idPrefix}brand-${brand.slug}`}
          label={brand.title}
          checked={selectedBrands.includes(brand.slug)}
          onCheckedChange={() => toggleValue("brand", selectedBrands, brand.slug)}
        />
      ))}
    </div>
  );

  const materialContent = (
    <div className="flex flex-col gap-2.5">
      {materials.map((material) => (
        <CheckboxRow
          key={material}
          id={`${idPrefix}material-${material}`}
          label={material}
          checked={selectedMaterials.includes(material)}
          onCheckedChange={() => toggleValue("material", selectedMaterials, material)}
        />
      ))}
    </div>
  );

  const sections = [
    { value: "price", title: "محدوده قیمت (تومان)", content: priceContent },
    categories.length > 0 ? { value: "category", title: "دسته‌بندی", content: categoryContent } : null,
    brands.length > 0 ? { value: "brand", title: "برند", content: brandContent } : null,
    materials.length > 0 ? { value: "material", title: "جنس", content: materialContent } : null,
  ].filter((section) => section !== null);

  return (
    <div
      className={cn(
        "flex flex-col gap-5 transition-opacity",
        isCard && "rounded-2xl border border-border bg-card p-5",
        isPending && "opacity-60",
      )}
    >
      {isCard ? (
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
            فیلترها
            <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
            {activeFilterCount > 0 ? <Badge variant="secondary">{activeFilterCount}</Badge> : null}
          </h2>
          {hasActiveFilters ? (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              پاک کردن
            </Button>
          ) : null}
        </div>
      ) : hasActiveFilters ? (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearAll}>
            پاک کردن
          </Button>
        </div>
      ) : null}

      {isCard ? (
        <Accordion
          multiple
          defaultValue={sections.map((section) => section.value)}
          className="gap-0"
        >
          {sections.map((section) => (
            <AccordionItem key={section.value} value={section.value}>
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>{section.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        sections.map((section) => (
          <FilterGroup key={section.value} title={section.title}>
            {section.content}
          </FilterGroup>
        ))
      )}
    </div>
  );
}
