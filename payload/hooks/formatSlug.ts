import type { FieldHook } from "payload";

const formatSlugValue = (value: string): string =>
  value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w؀-ۿ-]+/g, "")
    .toLowerCase();

export const formatSlug =
  (fieldToUse: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === "string" && value.length > 0) {
      return formatSlugValue(value);
    }

    const fallback = data?.[fieldToUse] || originalDoc?.[fieldToUse];

    if (typeof fallback === "string" && fallback.length > 0) {
      return formatSlugValue(fallback);
    }

    return value;
  };
