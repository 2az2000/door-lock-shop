import { types } from "node:util";

import type { CollectionBeforeChangeHook } from "payload";

/**
 * `@vercel/blob`'s `put()` sends the file body through undici's `fetch`, which
 * rejects anything backed by a SharedArrayBuffer with
 * `TypeError: ArrayBuffer: SharedArrayBuffer is not allowed.`
 *
 * On Vercel's serverless runtime the buffers Sharp hands back can be backed by
 * exactly that, so every Media upload failed there with a 500 while the same
 * code worked locally. Copying the bytes into a plain, owned Buffer is enough
 * to satisfy undici.
 *
 * The storage plugin reads these buffers off `req` in its own `afterChange`
 * hook, and Payload runs collection `beforeChange` hooks well before that — so
 * this is the last safe point where the swap is still picked up.
 */
const toUnsharedBuffer = (buffer: Buffer): Buffer =>
  types.isSharedArrayBuffer(buffer.buffer) ? Buffer.from(buffer) : buffer;

export const normalizeUploadBuffers: CollectionBeforeChangeHook = ({ data, req }) => {
  if (req.file) {
    req.file.data = toUnsharedBuffer(req.file.data);
  }

  // Mutated in place on purpose: the storage plugin stashes a reference to this
  // exact object on `req.context`, so replacing the whole record would leave the
  // original shared-backed buffers behind.
  if (req.payloadUploadSizes) {
    for (const [name, buffer] of Object.entries(req.payloadUploadSizes)) {
      req.payloadUploadSizes[name] = toUnsharedBuffer(buffer);
    }
  }

  return data;
};
