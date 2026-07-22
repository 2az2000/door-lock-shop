import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { ArticleCategories } from "./payload/collections/ArticleCategories";
import { Articles } from "./payload/collections/Articles";
import { Brands } from "./payload/collections/Brands";
import { Categories } from "./payload/collections/Categories";
import { Media } from "./payload/collections/Media";
import { Products } from "./payload/collections/Products";
import { Users } from "./payload/collections/Users";
import { SiteSettings } from "./payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret = process.env.PAYLOAD_SECRET;

if (!payloadSecret) {
  throw new Error(
    "PAYLOAD_SECRET environment variable is required. Set it in .env.local before starting the app — never fall back to an empty secret, as it would allow forging auth tokens.",
  );
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Categories, Brands, Products, ArticleCategories, Articles],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
});
