import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

import { pool } from "@/lib/db";

export const auth = betterAuth({
  appName: "GENBA MAP",
  database: pool,
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
  user: {
    modelName: "users",
    fields: {
      name: "display_name",
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    additionalFields: {
      // Keep the existing DB roles; registration must never accept a role from the client.
      role: {
        type: "string",
        required: true,
        defaultValue: "一般",
        input: false,
      },
    },
  },
  session: {
    modelName: "auth_sessions",
    fields: {
      userId: "user_id",
      expiresAt: "expires_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  account: {
    modelName: "auth_accounts",
    fields: {
      userId: "user_id",
      accountId: "account_id",
      providerId: "provider_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      idToken: "id_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  verification: {
    modelName: "auth_verifications",
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  advanced: {
    database: { generateId: "uuid" },
  },
  plugins: [nextCookies()],
});
