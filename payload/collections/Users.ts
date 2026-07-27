import type { CollectionConfig, FieldAccess } from "payload";

import { superAdminOnly } from "../access/superAdminOnly";

const roleFieldUpdateAccess: FieldAccess = ({ req: { user } }) => user?.role === "admin";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  // Payload's built-in "create first user" bootstrap flow works regardless of
  // this — it only applies once at least one user already exists. After that,
  // only a user with role "admin" can create/update/delete other user
  // accounts, so a single trusted admin controls who else gets access.
  access: {
    create: superAdminOnly,
    read: superAdminOnly,
    update: superAdminOnly,
    delete: superAdminOnly,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "مدیر کل", value: "admin" },
        { label: "ویرایشگر", value: "editor" },
      ],
      // Only an existing admin can grant/change the admin role — an editor
      // can never promote themselves (or anyone else) via the API.
      access: {
        update: roleFieldUpdateAccess,
      },
    },
  ],
};
