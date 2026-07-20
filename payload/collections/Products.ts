import type { CollectionConfig } from "payload";

import { adminOnly } from "../access/adminOnly";
import { readPublished } from "../access/readPublished";
import { seoFields } from "../fields/seo";
import { slugField } from "../fields/slug";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "brand", "price", "published"],
  },
  access: {
    read: readPublished,
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
      name: "shortDescription",
      type: "textarea",
    },
    {
      name: "fullDescription",
      type: "richText",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "brand",
      type: "relationship",
      relationTo: "brands",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "price",
      type: "number",
      min: 0,
      admin: {
        description: 'Leave empty and use priceLabel for a "Contact for price" style display.',
      },
    },
    {
      name: "priceLabel",
      type: "text",
      admin: {
        description: 'Optional override shown instead of the price, e.g. "تماس بگیرید".',
      },
    },
    {
      name: "specifications",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "colors",
      type: "text",
      hasMany: true,
    },
    {
      name: "materials",
      type: "text",
      hasMany: true,
    },
    {
      name: "dimensions",
      type: "text",
    },
    {
      name: "weight",
      type: "text",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    ...seoFields,
  ],
};
