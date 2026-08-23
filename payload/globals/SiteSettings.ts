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
      name: "homepage",
      type: "group",
      label: "صفحه‌ی اصلی",
      fields: [
        {
          name: "heroImages",
          type: "upload",
          relationTo: "media",
          hasMany: true,
          maxRows: 8,
          admin: {
            description:
              "تصاویر بخش ابتدایی صفحه‌ی اصلی. هر اسلاید دو تصویر پشت سر هم نمایش می‌دهد. اگر خالی بماند، از تصاویر دسته‌بندی‌ها استفاده می‌شود.",
          },
        },
        {
          name: "aboutImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description:
              "تصویر بخش «درباره ...» که زیر محصولات ویژه نمایش داده می‌شود. اگر خالی بماند، از تصویر اولین دسته‌بندی استفاده می‌شود.",
          },
        },
      ],
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
