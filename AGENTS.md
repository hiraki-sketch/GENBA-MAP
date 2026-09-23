# GENBA MAP

## レンダリングの切り分け

地図は Leaflet（`window` とタイル）の都合で **CSR** にする。ピンのデータはクライアントで取りに行かない。サーバーで事故の緯度経度を渡し、地図の描画だけをクライアントにする。

- **SSR** … 事故一覧、ダッシュボード、設定のドライバー一覧、登録時のドライバー名簿
- **CSR** … 地図（本画面・登録の地点選択・ダッシュボードのプレビュー）
- **SSG（静的）** … シェル、ナビ、変わらない文言

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
