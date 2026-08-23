import type { CollectionBeforeChangeHook } from "payload";
import sharp from "sharp";

/** Width of the inlined preview. Small enough to keep the data URL ~1KB. */
const BLUR_WIDTH = 16;

/**
 * Builds a tiny base64 WebP preview of the uploaded image and stores it on the
 * document, so `next/image` can paint a colour-matched placeholder while the
 * real file downloads. Generated once at upload time — never per request.
 */
export const generateBlurDataURL: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  const file = req.file;

  // Only (re)generate when a new binary actually arrives; metadata-only edits
  // (changing `alt`, for instance) must keep the existing preview.
  if (!file?.data || (operation !== "create" && operation !== "update")) {
    return data;
  }

  try {
    const buffer = await sharp(file.data)
      .rotate()
      .resize(BLUR_WIDTH, BLUR_WIDTH, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();

    return { ...data, blurDataURL: `data:image/webp;base64,${buffer.toString("base64")}` };
  } catch (error) {
    // A missing preview is a cosmetic downgrade, never a reason to reject an
    // upload — the UI falls back to a neutral placeholder.
    req.payload.logger.warn(
      `blurDataURL generation failed for "${file.name}": ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    return data;
  }
};
