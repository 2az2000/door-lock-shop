import type { Field } from "payload";

export const seoFields: Field[] = [
  {
    name: "seoTitle",
    type: "text",
    admin: {
      description: "Overrides the default title tag for search engines.",
    },
  },
  {
    name: "seoDescription",
    type: "textarea",
    admin: {
      description: "Overrides the default meta description for search engines.",
    },
  },
];
