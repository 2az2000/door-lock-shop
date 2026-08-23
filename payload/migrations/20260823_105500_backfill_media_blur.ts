import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const BLUR_WIDTH = 16

/**
 * Backfills `blurDataURL` for uploads that predate the generation hook.
 *
 * Runs as a migration because the production database credentials live only on
 * the deploy machine, so `npm run backfill:blur` cannot be pointed at it from a
 * developer's laptop.
 *
 * Never throws: a preview that cannot be rebuilt is a cosmetic downgrade (the
 * UI falls back to a neutral placeholder) and must not fail a deployment.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const { rows } = await db.execute<{ id: number; url: string | null; filename: string | null }>(
    sql`select "id", "url", "filename" from "media" where "blur_data_u_r_l" is null`,
  )

  let updated = 0

  for (const row of rows) {
    try {
      const source = await readSource(row.url, row.filename)
      if (!source) continue

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

/**
 * Blob-backed uploads carry an absolute URL; local `staticDir` uploads carry a
 * site-relative one that nothing is serving at build time, so those are read
 * straight off disk instead.
 */
const readSource = async (
  url: string | null,
  filename: string | null,
): Promise<Buffer | null> => {
  if (url?.startsWith('http')) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`fetch failed with ${response.status}`)
    return Buffer.from(await response.arrayBuffer())
  }

  if (!filename) return null

  return readFile(path.join(process.cwd(), 'media', filename))
}
