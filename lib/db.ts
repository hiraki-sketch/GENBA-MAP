import { Pool, type QueryResultRow } from "pg";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://genba:genba@localhost:5434/genba_map";

const globalForDb = globalThis as typeof globalThis & {
  pgPool?: Pool;
};

export const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}

function collectErrorParts(error: unknown): string[] {
  if (typeof error !== "object" || error === null) {
    return [];
  }

  const record = error as {
    code?: unknown;
    errors?: unknown;
  };
  const parts: string[] = [];

  if (error instanceof Error) {
    parts.push(error.message);
  }

  if (typeof record.code === "string") {
    parts.push(record.code);
  }

  if (Array.isArray(record.errors)) {
    parts.push(...record.errors.flatMap(collectErrorParts));
  }

  return parts;
}

function toDbError(error: unknown) {
  const combined = collectErrorParts(error).join(" ");

  if (
    combined.includes("ECONNREFUSED") ||
    combined.includes("connect") ||
    combined.includes("timeout")
  ) {
    return new Error(
      "PostgreSQL に接続できません。Docker Desktop を起動してから npm run db:up を実行してください。"
    );
  }

  if (error instanceof Error && error.message) {
    return error;
  }

  return new Error("データベースの操作に失敗しました。");
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
) {
  try {
    const result =
      params === undefined
        ? await pool.query<T>(text)
        : await pool.query<T>(text, params);
    return result.rows;
  } catch (error) {
    throw toDbError(error);
  }
}
