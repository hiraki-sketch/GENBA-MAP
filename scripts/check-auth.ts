import assert from "node:assert/strict";
import { getMigrations } from "better-auth/db/migration";

async function main() {
  // Use Next's environment loading order without printing credentials.
  const { loadEnvConfig } = await import("@next/env");
  loadEnvConfig(process.cwd());
  const { auth } = await import("../lib/auth");
  const { pool } = await import("../lib/db");

  try {
    const migrations = await getMigrations(auth.options);
    assert.deepEqual(migrations.toBeCreated, [], "Missing auth tables");
    assert.deepEqual(migrations.toBeAdded, [], "Missing auth columns");
    assert.deepEqual(migrations.schemaProblems, [], "Auth schema mismatch");

    const baseURL = process.env.BETTER_AUTH_URL;
    assert.ok(baseURL, "BETTER_AUTH_URL is required");
    const session = await auth.handler(new Request(`${baseURL}/api/auth/get-session`));
    assert.equal(session.status, 200);
    assert.equal(await session.json(), null);

    const signup = await auth.handler(new Request(`${baseURL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: baseURL },
      body: JSON.stringify({
        name: "Signup must be disabled",
        email: "auth-check@example.invalid",
        password: "NotARealAccount-12345!",
      }),
    }));
    assert.equal(signup.status, 400);
    assert.equal((await signup.json()).code, "EMAIL_PASSWORD_SIGN_UP_DISABLED");
    console.log("PASS: DB schema, anonymous session, and disabled public signup");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Auth check failed");
  process.exitCode = 1;
});
