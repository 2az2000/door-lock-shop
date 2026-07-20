import type { RelationSummary } from "@/types/product";

type RelationDoc = { id: number; title: string; slug: string };

export const toRelationSummary = (
  value: number | RelationDoc | null | undefined,
): RelationSummary | null => {
  if (!value || typeof value === "number") return null;

  return { id: value.id, title: value.title, slug: value.slug };
};
