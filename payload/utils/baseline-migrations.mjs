/**
 * Repairs the migration bookkeeping of a database whose schema was pushed in
 * dev mode instead of migrated.
 *
 * Payload marks such a database with a single `dev` row in `payload_migrations`.
 * `payload migrate` then refuses to run unattended: it asks "you've run Payload
 * in dev mode ... data loss will occur, proceed? (y/N)". On a CI machine that
 * prompt gets no answer, defaults to "no", and migrate exits 0 without applying
 * anything — so the build carries on against a stale schema and only fails
 * later, with a confusing "column ... does not exist".
 *
 * This replaces the `dev` marker with the migrations whose changes are already
 * present in the schema, leaving the rest for `payload migrate` to apply.
 *
 * Runs before `payload migrate` in the `ci` script and is a no-op on any
 * database that was migrated properly (including a brand new one), so it can
 * stay in the build command permanently.
 *
 * Deliberately plain JS talking straight to Postgres: it has to run before
 * Payload boots, and must not pull in the TypeScript loader or the config.
 */
import pg from "pg";

/**
 * How to recognise that a migration's changes are already in the schema.
 *
 * Only migrations that existed when a database was last pushed can be
 * recognised — anything newer is left unlisted on purpose so `payload migrate`
 * applies it normally. Once a database is repaired the `dev` marker is gone for
 * good, so this list does not need to grow with every future migration.
 */
const APPLIED_WHEN = {
  "20260809_101527_initial": `select to_regclass('public.media') is not null as present`,
  "20260818_065406_add_media_blur_data_url": `
    select exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'media' and column_name = 'blur_data_u_r_l'
    ) as present`,
};

const connectionString =
  process.env.DATABASE_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL || "";

if (!connectionString) {
  console.error("baseline-migrations: no database connection string in the environment");
  process.exit(1);
}

const client = new pg.Client({ connectionString });
await client.connect();

try {
  const { rows: tables } = await client.query(
    `select to_regclass('public.payload_migrations') is not null as present`,
  );

  if (!tables[0].present) {
    console.log("baseline-migrations: no payload_migrations table yet — nothing to repair");
    process.exit(0);
  }

  const { rows: devRows } = await client.query(
    `select id from payload_migrations where name = 'dev'`,
  );

  if (devRows.length === 0) {
    console.log("baseline-migrations: database is already migration-tracked — nothing to repair");
    process.exit(0);
  }

  const alreadyApplied = [];
  for (const [name, probe] of Object.entries(APPLIED_WHEN)) {
    const { rows } = await client.query(probe);
    if (rows[0].present) alreadyApplied.push(name);
  }

  await client.query("begin");
  for (const name of alreadyApplied) {
    await client.query(
      `insert into payload_migrations (name, batch)
       select $1::varchar, 1
       where not exists (select 1 from payload_migrations where name = $1::varchar)`,
      [name],
    );
  }
  await client.query(`delete from payload_migrations where name = 'dev'`);
  await client.query("commit");

  console.log(
    `baseline-migrations: replaced the dev marker with ${alreadyApplied.length} recorded migration(s)` +
      (alreadyApplied.length ? `: ${alreadyApplied.join(", ")}` : ""),
  );
} catch (error) {
  await client.query("rollback").catch(() => {});
  console.error("baseline-migrations failed:", error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  await client.end();
}
