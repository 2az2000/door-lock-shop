import type { CollectionConfig } from "payload";

import { adminOnly } from "../access/adminOnly";
import { publicRead } from "../access/publicRead";
import { slugField } from "../fields/slug";

export const Brands: CollectionConfig = {
  slug: "brands",
  admin: {
    useAsTitle: "title",
  },
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
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
  ],
};
