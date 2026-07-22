"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ArticleCategorySummary } from "@/types/article";

interface ArticleFiltersProps {
  categories: ArticleCategorySummary[];
}

const ALL_VALUE = "all";

export function ArticleFilters({ categories }: ArticleFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const categoryItems = [
    { value: ALL_VALUE, label: "همه دسته‌بندی‌ها" },
    ...categories.map((category) => ({ value: category.slug, label: category.title })),
  ];

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === ALL_VALUE) {
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

  useEffect(() => {
    const currentQ = searchParams.get("q") ?? "";
    if (search === currentQ) return;

    const timeout = setTimeout(() => {
      updateParams({ q: search || null });
    }, 400);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <InputGroup className="sm:max-w-sm">
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="جستجوی مقاله..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </InputGroup>

      {categories.length > 0 ? (
        <Select
          items={categoryItems}
          value={searchParams.get("category") ?? ALL_VALUE}
          onValueChange={(value) => updateParams({ category: value as string })}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="دسته‌بندی" />
          </SelectTrigger>
          <SelectContent>
            {categoryItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
}
