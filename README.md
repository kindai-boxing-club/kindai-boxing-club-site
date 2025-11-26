# 近畿大学ボクシング部 公式ウェブサイト

近畿大学ボクシング部の公式ウェブサイトです。

## 🥊 概要

- **技術スタック**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **特徴**: レスポンシブデザイン、モダンな UI、高速なパフォーマンス

## 📁 ディレクトリ構造

```
boxing-club-site/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # トップページ（部員紹介を含む）
│   ├── globals.css          # グローバルスタイル
│   └── blog/                # ブログ機能
│       ├── page.tsx         # ブログ一覧
│       └── [slug]/
│           └── page.tsx     # ブログ詳細
├── components/              # Reactコンポーネント
│   ├── layout/              # レイアウトコンポーネント
│   │   ├── Navigation.tsx   # ヘッダーナビゲーション
│   │   └── Footer.tsx       # フッター
│   ├── members/             # 部員紹介コンポーネント
│   │   ├── MemberCard.tsx   # 部員カード
│   │   └── MemberSection.tsx # 部員セクション
│   └── ui/                  # 共通UIコンポーネント
│       └── ImageWithFallback.tsx # 画像表示（フォールバック付き）
├── config/                  # 設定ファイル
│   └── sheets.ts            # Google Sheets設定
├── lib/                     # ユーティリティ・データ
│   ├── blog/                # ブログ関連
│   │   └── data.ts          # ブログデータ
│   └── members/             # 部員紹介関連
│       ├── fetchMembersFromSheet.ts # Google Sheets取得処理
│       └── grouping.ts      # 分類グルーピング処理
├── types/                   # TypeScript型定義
│   └── index.ts             # 共通型定義
├── public/                  # 静的ファイル
│   └── images/              # 画像ファイル
└── package.json             # 依存関係
```

## 🚀 開発環境のセットアップ

### 必要要件

- Node.js 18 以上
- npm または yarn

### インストール

\`\`\`bash

# 依存関係のインストール

npm install

# 開発サーバーの起動

npm run dev
\`\`\`

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 📝 ページ構成

### トップページ (`/`)

-

### ブログ (`/blog`)

-

### ブログ詳細 (`/blog/[slug]`)

-

## 📊 データ管理

### 部員・スタッフデータ

Google Sheets で管理しています。

- **シート ID**: `lib/membersConfig.ts` で設定
- **反映**: ビルド時または再検証時に更新されます

### ブログデータ

`lib/data.ts` で管理しています。

## 🎨 デザインシステム

### カラーパレット

- **ベース**: 白色 (#FFFFFF)
- **メイン**: 紺色 (#1e3a8a - blue-900)
- **アクセント**: 赤色 (#dc2626 - red-600)
- **テキスト**: グレー (#111827 - gray-900)

### コンポーネントスタイル

- カードデザイン: 白背景、紺ボーダー、ホバー時赤ボーダー
- ボタン: 赤背景（CTA）、紺背景（セカンダリ）
- グラデーション: 紺系のグラデーション

## 🔧 ビルド

\`\`\`bash

# プロダクションビルド

npm run build

# ビルドの実行

npm start
\`\`\`

## 📱 レスポンシブ対応

- モバイル: 〜768px
- タブレット: 768px〜1024px
- デスクトップ: 1024px〜

## 🌐 デプロイ

### Vercel（推奨）

\`\`\`bash

# Vercel CLI のインストール

npm i -g vercel

# デプロイ

vercel
\`\`\`

### その他のプラットフォーム

- Netlify
- AWS Amplify
- Cloudflare Pages

## 📞 お問い合わせ

近畿大学ボクシング部

- Instagram: [@your-instagram](https://www.instagram.com)

## 📄 ライセンス

© 2024 近畿大学ボクシング部. All rights reserved.
