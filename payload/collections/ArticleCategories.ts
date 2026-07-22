import type { CollectionConfig } from "payload";

import { adminOnly } from "../access/adminOnly";
import { publicRead } from "../access/publicRead";
import { slugField } from "../fields/slug";

export const ArticleCategories: CollectionConfig = {
  slug: "article-categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "order"],
  },
  defaultSort: "order",
  access: {
    read: publicRead,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
