# GENBA-MAP

物流現場向けアプリケーション

## Better Auth の導入

認証基盤に Better Auth を使用します。`lib/auth.ts` が既存の PostgreSQL
接続プールを利用し、`/api/auth/*` で認証 API を提供します。
ブラウザー用クライアントは `lib/auth-client.ts` です。

1. `npm install` を実行します。
2. `.env.local` に `DATABASE_URL`、`BETTER_AUTH_URL`（ローカルでは
   `http://localhost:3000`）、`BETTER_AUTH_SECRET` を設定します。
   秘密鍵は `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"`
   で生成し、環境ごとに異なる値を設定します。Gitには登録しません。
3. `npm run db:up`、`npm run db:migrate` を実行します。
4. `npm run auth:check` でスキーマ、未ログイン状態、公開登録の拒否を確認します。

既存の `users` とUUIDを維持し、`auth_sessions`、`auth_accounts`、
`auth_verifications` を追加します。パスワードのハッシュはBetter Authが
`auth_accounts.password` に保存します。既存ユーザーには自動でパスワードを付与しません。
DBの `role` は既存の「システム管理者」「一般」を維持し、一般配車担当は「一般」に対応します。
クライアントからの権限指定は受け付けません。

現段階は認証基盤の導入までです。公開の新規登録は無効です。
初期管理者作成、招待・メール送信、ログイン画面の接続、ページとServer Actionsの
アクセス制御は後続の実装です。現在の画面はまだ認証で保護されていません。

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
