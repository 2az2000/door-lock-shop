/**
 * Fills in `blurDataURL` for media uploaded before the preview hook existed.
 *
 * Safe to re-run: documents that already carry a preview are skipped. Reads the
 * binary from the local `media/` directory when present, otherwise from the
 * stored URL (Vercel Blob in production).
 *
 * Usage: npm run backfill:blur
 */
import path from "node:path";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { getPayload } from "payload";
import sharp from "sharp";

import config from "../../payload.config";

const BLUR_WIDTH = 16;
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const readSource = async (filename: string | null | undefined, url: string | null | undefined) => {
  if (filename) {
    try {
      return await readFile(path.join(rootDir, "media", filename));
    } catch {
      // Fall through to the remote copy.
    }
  }

  if (!url) return null;

  const absolute = url.startsWith("http")
    ? url
    : new URL(url, process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").toString();

  const response = await fetch(absolute);
  if (!response.ok) return null;

  return Buffer.from(await response.arrayBuffer());
};

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "media",
  limit: 0,
  pagination: false,
  depth: 0,
});

let updated = 0;
let skipped = 0;
let failed = 0;

for (const doc of docs) {
  if (doc.blurDataURL) {
    skipped += 1;
    continue;
  }

  try {
    const source = await readSource(doc.filename, doc.url);
    if (!source) throw new Error("source file not reachable");

    const buffer = await sharp(source)
      .rotate()
      .resize(BLUR_WIDTH, BLUR_WIDTH, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();

    await payload.update({
      collection: "media",
      id: doc.id,
      data: { blurDataURL: `data:image/webp;base64,${buffer.toString("base64")}` },
    });

    updated += 1;
  } catch (error) {
    failed += 1;
    console.warn(
      `skipped #${doc.id} (${doc.filename ?? "no file"}): ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

console.log(`blur backfill — updated: ${updated}, already had one: ${skipped}, failed: ${failed}`);
process.exit(failed > 0 && updated === 0 ? 1 : 0);
