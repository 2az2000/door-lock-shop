"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Brand } from "@/types/brand";
import type { CategorySummary } from "@/types/category";

interface ProductFiltersSidebarProps {
  categories: CategorySummary[];
  brands: Brand[];
  materials: string[];
  idPrefix?: string;
}

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
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
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal text-muted-foreground">
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
}: ProductFiltersSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

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

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedMaterials.length > 0 ||
    Boolean(searchParams.get("minPrice")) ||
    Boolean(searchParams.get("maxPrice"));

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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-base font-semibold text-foreground">فیلترها</h2>
        {hasActiveFilters ? (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            پاک کردن
          </Button>
        ) : null}
      </div>

      <FilterGroup title="محدوده قیمت (تومان)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="از"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          <span className="text-xs text-muted-foreground">تا</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="تا"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-1.5 text-sm text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </div>
      </FilterGroup>

      {categories.length > 0 ? (
        <FilterGroup title="دسته‌بندی">
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
        </FilterGroup>
      ) : null}

      {brands.length > 0 ? (
        <FilterGroup title="برند">
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
        </FilterGroup>
      ) : null}

      {materials.length > 0 ? (
        <FilterGroup title="جنس">
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
        </FilterGroup>
      ) : null}
    </div>
  );
}
