import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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

// Media is stored on Vercel Blob in production and on the local `staticDir`
// during development. Presence of the token is what switches modes, so a local
// checkout without the token keeps working exactly as before.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

// `DATABASE_URI` is what local setups use. Vercel's Neon/Postgres marketplace
// integration injects its own names instead, so accept those too rather than
// making the operator duplicate the connection string by hand (which drifts
// the moment the database password is rotated). Pooled URLs come first.
const databaseUri =
  process.env.DATABASE_URI ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  "";

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
      connectionString: databaseUri,
    },
    migrationDir: path.resolve(dirname, "payload/migrations"),
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      collections: { media: true },
      token: blobToken,
    }),
  ],
  sharp,
});
