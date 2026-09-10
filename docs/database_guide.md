# データベース構成

当プロジェクトではCloudflare D1（SQLite）を使用し、部員とスタッフのデータを管理しています。
本番のデータベースには個人情報が含まれるため、GitHub等にデータを直接コミットしないようにしてください。

## 1. members テーブル
選手・マネージャーの情報を管理します。

| カラム名 | 型 | 説明 |
|---|---|---|
| `id` | INTEGER | 主キー (自動採番) |
| `name` | TEXT | 氏名 |
| `grade` | TEXT | 学年 ("1年"〜"4年", "院生") |
| `position` | TEXT | 役職（"主将", "副将", "主務", "会計"など）。役職がない場合は NULL |
| `is_manager` | INTEGER | マネージャーかどうかのフラグ (1: マネージャー, 0: 選手) |
| `faculty` | TEXT | 所属学部 |
| `weight_class` | INTEGER | 階級（数値のみ）。登録がない場合は NULL |
| `state` | TEXT | 現在のステータス ("active": 現役, "graduated": 卒業, "deleted": 削除) |
| `has_experience` | INTEGER | ボクシング経験の有無 (1: 経験者, 0: 未経験) |

## 2. staff テーブル
指導者（監督・コーチ陣など）の情報を管理します。

| カラム名 | 型 | 説明 |
|---|---|---|
| `id` | INTEGER | 主キー (自動採番) |
| `name` | TEXT | 氏名 |
| `grade` | TEXT | 役職名 ("部長", "総監督", "監督", "コーチ" など) |
| `state` | TEXT | 現在のステータス ("active": 現役, "deleted": 削除) |
| `bio` | TEXT | 紹介文。**本番DBのみ**の想定で、ローカルDBには未追加（後述） |

> `Staff.position` はテーブルの列ではありません。`lib/db/staff.repository.ts` の `getAllActive()` が読み取り時に `grade` をコピーして生成している派生値です。

## 3. ローカルDBのセットアップ

ローカルのD1（`.wrangler/state/v3/`）は **Git管理外** のため、環境を移行したときはテーブルを作り直す必要があります（`no such table` エラーが出る場合はこれ）。

```sql
CREATE TABLE members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  position TEXT,
  is_manager INTEGER DEFAULT 0,
  faculty TEXT,
  weight_class INTEGER,
  state TEXT DEFAULT 'active',
  has_experience INTEGER DEFAULT 0
);

CREATE TABLE staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  state TEXT DEFAULT 'active',
  bio TEXT
);
```

実行例（ローカルDBに対して）:

```bash
npx wrangler d1 execute kindai-boxing-db --local --file=./schema.sql
```

> 既存のローカルDBに `bio` 列だけ足す場合: `ALTER TABLE staff ADD COLUMN bio TEXT;`
> `bio` が無いままだと、スタッフの追加・更新が（エラーを握りつぶす実装のため）黙って失敗します。

## データの操作について

データの追加・更新・削除は、CloudflareダッシュボードのD1コンソール画面から直接行うか、ローカルでテスト用のWranglerコマンド経由で行ってください。

### 状態（state）の扱い
- 削除は物理削除ではなく `state` を `'deleted'` にする論理削除（`lib/db/person.repository.ts`）
- `restore` は `deleted` → `active`、`eliminate`（物理削除）は `deleted` のレコードにのみ実行できる
- 公開サイトは常に `state = 'active'` のみを取得する
- 管理画面の一覧・編集画面はデフォルト `active` のみ表示だが、「卒業・退部を表示」トグルで全状態を表示できる。状態の変更自体も編集画面のセレクトから行う（専用の状態変更ページは廃止）
