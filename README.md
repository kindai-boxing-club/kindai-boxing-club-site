# 近畿大学体育会ボクシング部 公式ウェブサイト

近畿大学体育会ボクシング部の公式ウェブサイトのソースコードです。

## ドキュメントの案内

目的別に4つに分かれています。**まず知りたいことから引く**構成です。

| 知りたいこと | 見る場所 |
|---|---|
| 動かし方・写真の準備 | このファイル（README） |
| どこに何を書くか／全体の設計 | [docs/PROJECT.md](./docs/PROJECT.md) |
| DBの列の意味・ローカルDBの作り方 | [docs/database_guide.md](./docs/database_guide.md) |
| 既知のバグと直し方 | [privateDocs/ISSUES.md](./privateDocs/ISSUES.md)（ローカル限定） |
| AI（Claude Code / Gemini）への指示の前提 | [CLAUDE.md](./CLAUDE.md) |

### 作業を始める前に

- **機能を追加する** → `docs/PROJECT.md` の「10. 新機能追加時のチェックリスト」をなぞる
- **バグを直す** → `privateDocs/ISSUES.md` に既出でないか先に確認する（原因と修正案が書いてある）
- **DBの列を増やす** → `docs/database_guide.md` を更新し、`types/index.ts` → `lib/db/` → `lib/admin/*.config.ts` の順で追う
- **挙動がおかしい** → `lib/db/client.ts` がエラーを握りつぶす設計なので、まずターミナルの
  `Query execution failed` / `Execute failed` を確認する

> 技術スタック・アーキテクチャ・デザインシステム・コーディング規約などの詳細は **[プロジェクトドキュメント](./docs/PROJECT.md)** を参照してください。

## クイックスタート

### 必要なもの

- Node.js (v20以上推奨)
- npm

### セットアップ

```bash
npm install
npm run dev        # → http://localhost:3000（ローカルのD1/R2エミュレート）
```

初回はローカルDBが空のためモックデータが表示されます。テーブル作成は [データベース運用ガイド](./docs/database_guide.md) を参照してください。

本番の D1/R2 に接続してテストする場合：

```bash
npm run dev:remote # → http://localhost:8788（本番DB/R2に直接接続。データ操作に注意）
```

> コマンドの詳細は [開発フロー](./docs/PROJECT.md#7-開発フロー) を参照

## デプロイ

GitHub → Cloudflare Pages の自動デプロイ。

## 部員・スタッフ写真のガイドライン

Cloudflare のホスティング制限を考慮し、以下のガイドラインに従って画像を準備してください。

### 推奨スペック

- **アスペクト比**: `3:4` (縦長)
- **推奨解像度**: `600x800px`
  - これ以上の大きさは表示上必要ありません。大きすぎる画像は読み込み遅延の原因になります。
- **ファイル形式**: `WebP` (推奨) または `JPG`
  - PNG はファイルサイズが大きくなりやすいため、写真には不向きです。
- **ファイルサイズ**: 1枚あたり `100KB以下` を目指してください。

### 画像の変換方法

オンラインの変換ツール（Squoosh など）を使用して、リサイズと WebP 変換を行ってください。
