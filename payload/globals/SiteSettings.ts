import type { GlobalConfig } from "payload";

import { adminOnly } from "../access/adminOnly";
import { publicRead } from "../access/publicRead";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: publicRead,
    update: adminOnly,
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "mobile",
      type: "text",
    },
    {
      name: "whatsapp",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "address",
      type: "textarea",
    },
    {
      name: "googleMap",
      type: "text",
      admin: {
        description: "Google Maps embed URL or share link.",
      },
    },
    {
      name: "instagram",
      type: "text",
    },
    {
      name: "telegram",
      type: "text",
    },
    {
      name: "workingHours",
      type: "array",
      fields: [
        { name: "day", type: "text", required: true },
        { name: "hours", type: "text", required: true },
      ],
    },
    {
      name: "footerText",
      type: "textarea",
    },
    {
      name: "seoDefaults",
      type: "group",
      fields: [
        { name: "seoTitle", type: "text" },
        { name: "seoDescription", type: "textarea" },
      ],
    },
  ],
};
