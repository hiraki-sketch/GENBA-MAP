import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Client } from "pg";

const rootDir = process.cwd();
const migrationsDir = path.join(rootDir, "db", "migrations");
const seedPath = path.join(rootDir, "db", "seed.sql");

function loadEnvFile(filename: string) {
  const filePath = path.join(rootDir, filename);
  if (!existsSync(filePath)) {
    return;
  }

  const contents = readFileSync(filePath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");
loadEnvFile(".env.example");

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://genba:genba@localhost:5434/genba_map";

async function runSqlFile(client: Client, filePath: string) {
  const sql = readFileSync(filePath, "utf8");
  await client.query(sql);
}

async function migrate(client: Client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  const files = readdirSync(migrationsDir)
    .filter((filename) => filename.endsWith(".sql"))
    .sort();

  const applied = await client.query<{ filename: string }>(
    "SELECT filename FROM schema_migrations"
  );
  const appliedSet = new Set(applied.rows.map((row) => row.filename));

  for (const filename of files) {
    if (appliedSet.has(filename)) {
      console.log(`skip  ${filename}`);
      continue;
    }

    const filePath = path.join(migrationsDir, filename);
    await client.query("BEGIN");
    try {
      await runSqlFile(client, filePath);
      await client.query(
        "INSERT INTO schema_migrations (filename) VALUES ($1)",
        [filename]
      );
      await client.query("COMMIT");
      console.log(`apply ${filename}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    }
  }
}

async function seed(client: Client) {
  await runSqlFile(client, seedPath);
  console.log("seed  db/seed.sql");
}

async function main() {
  const shouldSeed = process.argv.includes("--seed");
  const client = new Client({ connectionString });

  await client.connect();
  try {
    await migrate(client);
    if (shouldSeed) {
      await seed(client);
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
