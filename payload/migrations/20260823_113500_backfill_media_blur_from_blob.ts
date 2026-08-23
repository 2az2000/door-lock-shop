import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const BLUR_WIDTH = 16

/**
 * Second attempt at the blur backfill (see 20260823_105500). The first pass
 * skipped every row: on Blob-backed installs the stored `url` is site-relative
 * (`/api/media/file/<name>`, served by Payload's own route), and nothing serves
 * it while the build that runs the migration is still being built.
 *
 * This resolves the real object URLs through the Blob API instead, matching by
 * filename, and keeps the local-disk path for installs without a Blob token.
 *
 * Never throws: a preview that cannot be rebuilt only costs the neutral
 * placeholder and must not fail a deployment.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const { rows } = await db.execute<{ id: number; url: string | null; filename: string | null }>(
    sql`select "id", "url", "filename" from "media" where "blur_data_u_r_l" is null`,
  )

  if (rows.length === 0) {
    payload.logger.info('blur backfill: every upload already has a preview')
    return
  }

  const blobUrls = await loadBlobUrls(payload.logger)
  let updated = 0

  for (const row of rows) {
    try {
      const source = await readSource(row, blobUrls)
      if (!source) {
        payload.logger.warn(`blur backfill: no reachable source for media #${row.id}`)
        continue
      }

      const buffer = await sharp(source)
        .rotate()
        .resize(BLUR_WIDTH, BLUR_WIDTH, { fit: 'inside' })
        .webp({ quality: 40 })
        .toBuffer()

      const dataUrl = `data:image/webp;base64,${buffer.toString('base64')}`
      await db.execute(sql`update "media" set "blur_data_u_r_l" = ${dataUrl} where "id" = ${row.id}`)
      updated += 1
    } catch (error) {
      payload.logger.warn(
        `blur backfill skipped media #${row.id}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  }

  payload.logger.info(`blur backfill: ${updated}/${rows.length} media previews generated`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`update "media" set "blur_data_u_r_l" = null`)
}

/** filename → public object URL, empty when this install stores media on disk. */
const loadBlobUrls = async (logger: {
  warn: (message: string) => void
}): Promise<Map<string, string>> => {
  const urls = new Map<string, string>()
  if (!process.env.BLOB_READ_WRITE_TOKEN) return urls

  try {
    const { list } = await import('@vercel/blob')
    let cursor: string | undefined

    do {
      const page = await list({ cursor, limit: 1000 })
      for (const blob of page.blobs) urls.set(path.posix.basename(blob.pathname), blob.url)
      cursor = page.hasMore ? page.cursor : undefined
    } while (cursor)
  } catch (error) {
    logger.warn(
      `blur backfill could not list Blob objects: ${
        error instanceof Error ? error.message : String(error)
      }`,
    )
  }

  return urls
}

const readSource = async (
  row: { url: string | null; filename: string | null },
  blobUrls: Map<string, string>,
): Promise<Buffer | null> => {
  const objectUrl =
    row.url && row.url.startsWith('http')
      ? row.url
      : row.filename
        ? blobUrls.get(row.filename)
        : undefined

  if (objectUrl) {
    const response = await fetch(objectUrl)
    if (!response.ok) throw new Error(`fetch failed with ${response.status}`)
    return Buffer.from(await response.arrayBuffer())
  }

  if (!row.filename) return null

  return readFile(path.join(process.cwd(), 'media', row.filename))
}
