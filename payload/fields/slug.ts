import type { Field } from "payload";

import { formatSlug } from "../hooks/formatSlug";

export const slugField = (fieldToUse = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Used in the URL. Auto-generated from the title if left empty.",
  },
  hooks: {
    beforeValidate: [formatSlug(fieldToUse)],
  },
});
