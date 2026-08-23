import type { CollectionConfig } from "payload";

import { adminOnly } from "../access/adminOnly";
import { publicRead } from "../access/publicRead";
import { generateBlurDataURL } from "../hooks/generateBlurDataURL";
import { normalizeUploadBuffers } from "../hooks/normalizeUploadBuffers";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
  },
  hooks: {
    // Buffers are normalized first so the preview is generated from the same
    // owned bytes the storage plugin ends up uploading.
    beforeChange: [normalizeUploadBuffers, generateBlurDataURL],
  },
  access: {
    read: publicRead,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*"],
    formatOptions: {
      format: "webp",
      options: { quality: 80 },
    },
    imageSizes: [
      { name: "thumbnail", width: 400, height: 400, position: "centre" },
      { name: "card", width: 800, height: 800, position: "centre" },
      { name: "large", width: 1600, height: 1600, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "متن جایگزین تصویر — برای دسترس‌پذیری و سئو الزامی است.",
      },
    },
    {
      name: "blurDataURL",
      type: "text",
      // Written by the `generateBlurDataURL` beforeChange hook from the
      // uploaded binary; no field-level access rule here, since a `create:
      // false` rule would strip the value the hook just set.
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
  ],
};
