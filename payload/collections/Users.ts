import type { CollectionConfig } from "payload";

import { adminOnly } from "../access/adminOnly";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  // Payload's built-in "create first user" bootstrap flow works regardless of
  // this — it only applies once at least one user already exists.
  access: {
    create: adminOnly,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [],
};
