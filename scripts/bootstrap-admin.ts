import { loadEnvConfig } from "@next/env";
import { hashPassword } from "better-auth/crypto";
loadEnvConfig(process.cwd());

const email = process.env.BOOTSTRAP_ADMIN_EMAIL
  ?.trim()
  .toLowerCase();
const password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
if (!email) {
  throw new Error("BOOTSTRAP_ADMIN_EMAILを設定してください。");
}
if (!password || password.length < 8) {
  throw new Error(
    "BOOTSTRAP_ADMIN_PASSWORDを8文字以上で設定してください。"
  );
}
const adminEmail = email;
const adminPassword = password;


async function main() {
  const { pool } = await import("../lib/db");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query<{ id: string }>(
      `
        SELECT id
        FROM users
        WHERE role = 'システム管理者'
        FOR UPDATE
      `
    );

    if (result.rows.length !== 1) {
      throw new Error(
        "システム管理者が1件だけ存在する必要があります。"
      );
    }
    const userId = result.rows[0].id;
    const passwordHash = await hashPassword(adminPassword);
    await client.query(
      `
        UPDATE users
        SET email = $1,
            email_verified = TRUE
        WHERE id = $2
      `,
      [adminEmail, userId]
    );
    

    await client.query(
      `
        INSERT INTO auth_accounts (
          user_id,
          account_id,
          provider_id,
          password
        )
        VALUES ($1, $2, 'credential', $3)
        ON CONFLICT (provider_id, account_id)
        DO UPDATE SET
          password = EXCLUDED.password,
          updated_at = now()
      `,
      [userId, userId, passwordHash]
    );
    await client.query("COMMIT");
    console.log("初期管理者を設定しました。");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}
main().catch((error) => {
  console.error(
    error instanceof Error
      ? error.message
      : "初期管理者の設定に失敗しました。"
  );
});