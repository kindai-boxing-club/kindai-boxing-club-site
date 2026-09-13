# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

近畿大学体育会ボクシング部の公式サイト。公開サイト（LP形式のシングルページ）と管理画面を、Next.js 15 App Router + Cloudflare Pages (Edge Runtime) + D1 + R2 で構築している。

## ⚠️ 作業ルール（最優先）

**AI はソースコードを直接変更しない。** 明示的に「変更していい」と言われた場合を除き、
Edit / Write でコードを書き換えず、**変更内容をチャットにコードブロックで出力する**こと。
ユーザーがそれを写経・コピペして実装する（学習を兼ねた進め方のため）。

- 対象: `app/` `components/` `lib/` `types/` および `package.json` / 各種 config ファイル
- 例外: `*.md`（`CLAUDE.md`、`GEMINI.md`、`README.md`、`docs/`、`privateDocs/`）は直接編集してよい
- **ドキュメントの配置ルール**:
  - 公開・永続ドキュメント（プロジェクト仕様、DB構成等）は `docs/` に置く
  - **AI からユーザーへの指示・不具合管理・修正案・調査メモ等（`ISSUES.md` など）は `privateDocs/` 配下に作成・保存する**（`.gitignore` 対象）
- 出力の粒度: **ファイル全文は貼らない。** 構造が変わる場合でも、変更箇所とその前後数行だけを示す
- どこに貼るかが自明になるよう、**ファイルパスと周辺の数行**を必ず添える
- 既存のコメントは、それ自体が変更対象でない限り再掲しない
- 変更行数が多いときは、**コード内にコメントを入れて**どこが変わったのかを明示する
- **解説を省略しない。** 自明に簡単な変更を除き、なぜその実装なのか・使っている技術やAPIが何をするのかを説明する（学習を兼ねた進め方のため）
- 調査・`git`・lint・型チェックなどの読み取り専用コマンドは自由に実行してよい

このリポジトリは以前 Gemini で開発していた経緯があり、**コメントやドキュメントが実装と食い違っている箇所が複数ある**。
既存のコメントを根拠に判断せず、必ず実装を読んで裏を取ること。

> 詳細は [docs/PROJECT.md](./docs/PROJECT.md)（アーキテクチャ・デザインシステム・規約）、
> [docs/database_guide.md](./docs/database_guide.md)（DBスキーマ）、
> [privateDocs/ISSUES.md](./privateDocs/ISSUES.md)（**既知の不具合と修正案。コードを触る前に必読**）を参照。

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | Next.js dev サーバー（`localhost:3000`、HMRあり）。`setupDevPlatform` は `wrangler.json` の `remote` フラグを共有するため、`"remote": true` のままだと本番D1/R2への認証（OAuth）を要求し `Failed to fetch auth token` で失敗する。**`setupDevPlatform({ persist: true, remoteBindings: false })` にすれば常にローカルで起動できる**（[ISSUES.md 項目0](./privateDocs/ISSUES.md)） |
| `npm run dev:remote` | `pages:build` → `wrangler pages dev`（`localhost:8788`）。接続先は `wrangler.json` の `"remote"` 次第。フルビルドが走るため遅く、HMRも効かない。**本番データでの最終確認のときだけ**使う |
| `npm run pages:build` | `@cloudflare/next-on-pages` でCloudflare Pages向けビルド（デプロイと同じ経路） |
| `npm run lint` | ESLint。**現状は壊れている**（`ignores` 不足でビルド成果物まで検査し約3万件のエラーを出す）。当面は `npx eslint app components lib types` を使う（ソースはエラー0件）。直し方は [ISSUES.md 項目1](./privateDocs/ISSUES.md) |
| `npx tsc --noEmit` | 型チェック（`npm run lint` は型エラーを検出しない） |

- テストフレームワークは未導入。動作確認は上記 dev サーバーで行う。
- `npm run build` / `npm start` は素の Next.js ビルド。デプロイ検証には使わず `pages:build` を使う。
- デプロイは GitHub → Cloudflare Pages の自動デプロイ。

## アーキテクチャ

### レイヤリング（この順序を崩さない）

```
app/**/page.tsx (RSC)  →  lib/actions/*.action.ts ("use server" + revalidatePath)
                       →  lib/service/*.service.ts   ビジネスロジック・グループ化・モックfallback
                       →  lib/db/*.repository.ts     SQLを書くのはここだけ
                       →  lib/db/client.ts           getRequestContext() → D1
```

- `lib/db/client.ts` の `query`/`execute` は **例外を握りつぶして `[]` / `false` を返す**。SQLエラーやスキーマ不一致は画面上「データが無い」「保存が効かない」としてしか現れないので、挙動が怪しいときはサーバーログの `Query execution failed` / `Execute failed` を確認する。
- `lib/db/person.repository.ts` が `members`/`staff` 共通の状態操作（`remove` = soft delete, `restore`, `eliminate` = 物理削除）を持ち、各 repository がテーブル名を束縛して再エクスポートする。
- R2 は SDK 経由ではなく **公開URL組み立てのみ**（`lib/storage/client.ts` + `image.repository.ts`）。画像は `https://storage.kindai-boxing.com/{members|staff}/{id}.webp` という「IDがそのままファイル名」の規約。アップロード機能は未実装。

### Edge Runtime の付け方

D1/R2 に触れるルートは Edge Runtime が必須。ページ本体ではなく **`layout.tsx` に `export const runtime = "edge"` を置く**パターンを採っている（`app/(admin)/admin/[entity]/[mode]/layout.tsx` 等）。公開トップは `app/(public)/page.tsx` に直接書いている。新しい動的ルートを追加したら忘れずに指定すること。

制約: `node:*` モジュール・ネイティブモジュール（`bcrypt` 等）・ファイルシステムは使用不可。ハッシュ等が必要なら Web Crypto API を使う。

### 管理画面は設定駆動

`lib/admin/{member,staff}.config.ts` の `EntityConfig`（列定義＋`defaultValues`）を `PersonTable` が受け取って汎用描画する。`app/(admin)/admin/[entity]/[mode]/page.tsx` が `entity`（`members` / `staff`）× `mode`（`view` / `add` / `edit` / `delete`）で分岐する。

config は関数（`render`）を含むため RSC から直接渡せない。`AdminEntityView`（Client Component）が config を import して `PersonTable` に渡す**ラッパー**になっている ── ここを経由せず RSC から config を渡すとシリアライズエラーになる。

行の編集状態は `components/admin/useEditableRows.ts` に集約し、`PersonTable` は描画に専念させる。

### モックデータ fallback

`person.service` は repository の結果が **空配列のとき `lib/db/person.mock.ts` を返す**。ローカルD1が空でも画面が作れる一方、本番DBに `active` レコードが0件のときもモックが表示されるため、「保存したのに反映されない」ように見える事故が起きやすい点に注意。

### 認証

管理画面のアクセス制御は **Cloudflare Access**（`kindai-boxing.cloudflareaccess.com`）で、アプリ側にログイン実装は無い。`app/(admin)/admin/layout.tsx` にログアウトリンクがあるだけ。`package.json` の `generate-hash` スクリプトと `@types/bcrypt` は、廃止された自前認証の名残で **参照先 `scripts/generate-password-hash.ts` は存在しない**。

## 規約

- ファイル冒頭に `/** 役割の一行説明 */` を書く（既存ファイル全体で徹底されている）。
- 型は `types/index.ts` に集約。定数は `lib/constants.ts` に `as const` で置き、型は `(typeof X)[number]` で導出する。
- import は `@/*` エイリアス（tsconfig の `baseUrl: "."`）。
- コンポーネントは `components/public/` と `components/admin/` で分離。公開サイトの共通UIは `components/public/ui/`。
- スタイルは Tailwind v4。トークン（`--color-accent-red` 等）とカスタムユーティリティは `app/(public)/globals.css` の `@theme` / `@utility` に定義。動的なクラス結合は `clsx` + `tailwind-merge`。
- 日本語のコメント・ドキュメントで統一する。

## 触るときに事故りやすい箇所

- **フォント**: `next/font/google` は WSL でビルドがタイムアウトするため使っていない。`globals.css` の `@import url(...)` でブラウザロードし、`lib/fonts.ts` は空スタブ（`{variable:"", className:""}`）。layout が import しているので**削除しない**。`<body>` に付く variable クラスは空文字。
- **`wrangler.json` の `"remote"` フラグ**: `true` にすると D1・R2ともに本番を向き、`npm run dev:remote` での追加・編集・削除・一斉進級が**本物の部員データに反映される**。しかもこの値は `npm run dev` の `setupDevPlatform` とも共有されるため、両コマンドが1つのフラグを奪い合う。`next.config.ts` 側で `remoteBindings: false` を指定すると分離できる（[ISSUES.md 項目0](./privateDocs/ISSUES.md)）。**現在は `false`** なので `dev:remote` も本番にはつながっていない。
- **staff テーブルのスキーマ差異**: `staff.repository.ts` の INSERT/UPDATE は `bio` 列を使うが、ローカルの D1（`.wrangler/state`）には `bio` 列が無い。`execute` はエラーを握りつぶすため、スタッフの追加・更新が黙って失敗する。ローカルで検証するなら `bio TEXT` を足しておく。
- **staff の `position`**: DBの列ではなく、`staff.repository.getAllActive()` が読み取り時に `grade` をコピーして作っている派生値。
- **`weight_class`**: DB側は INTEGER、アプリ側の型は文字列リテラル（`"50"`〜`"75"`）。SQLite の型親和性で数値として戻るため、厳密比較を書くときは注意。
- **未実装のルート**: 管理画面トップの「写真変更」は `/admin/{entity}/photo` を指すが、`[mode]` の許可値に `photo` が無いため 404 になる。

判明済みの不具合（統計グラフのハードコード、`has_experience` の型不一致、一斉進級のコメント矛盾、
編集モードのID取り違えなど）は [privateDocs/ISSUES.md](./privateDocs/ISSUES.md) に確認方法と修正案つきでまとめてある。
