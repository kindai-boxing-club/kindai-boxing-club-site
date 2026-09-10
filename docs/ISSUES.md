# 既知の不具合・改善候補

コードを読んで確認した「間違い」の一覧です。**AIは直接コードを変更しません。**
この文書の修正案をコピペ／写経して、ユーザー自身が実装してください。

各項目には「確認方法」を付けています。指摘を鵜呑みにせず、まず自分の目で再現してから直すことを推奨します。

優先度: 🔴 = 実害が出ている / 🟡 = 条件次第で壊れる / 🟢 = 整理・改善

---

## 🔴 0. 開発フロー：`npm run dev` を捨てる必要はない

### 現状の理解は正しい

`npm run dev` が `Failed to fetch auth token` で止まる原因の分析は**当たっています**。
`node_modules` の実装を追って確認しました。

1. `next.config.ts` の `setupDevPlatform({ persist: true })` は、渡されたオプションを
   そのまま `wrangler` の `getPlatformProxy()` に流す（`@cloudflare/next-on-pages/dist/next-dev/index.cjs`）
2. `getPlatformProxy()` は `configPath` を指定されていないので、**カレントディレクトリの `wrangler.json` を読む**
3. wrangler 4.85 の `getPlatformProxy()` は次の条件でリモート接続セッションを張る

```js
if (config.configPath && options.remoteBindings !== false) {
  remoteProxySession = (await maybeStartOrUpdateRemoteProxySession({ ... })).session;
}
```

`"remote": true` があるとここで Cloudflare の認証（OAuth）が要求され、失敗すると
`Failed to fetch auth token` になります。**`npm run dev` と `dev:remote` が
1つの `remote` フラグを奪い合っている**、という理解で正しいです。

### ただし「`npm run dev` 非推奨」は行き過ぎ

`getPlatformProxy()` には **`remoteBindings` という公開オプション**があり、
型定義にも記載されています（`node_modules/wrangler/wrangler-dist/cli.d.ts`）。

```ts
    /**
     * Whether remote bindings should be enabled or not (defaults to `true`)
     */
    remoteBindings?: boolean;
```

これを `false` にすれば、**`wrangler.json` を `"remote": true` のままにしても
`npm run dev` はローカルエミュレートで起動します。** フラグの奪い合いが解消します。

**修正案** — `next.config.ts`

```ts
// 開発環境（npm run dev）のみ、ローカルの D1/R2 バインディングを起動する
// データは .wrangler/state/ に永続化される
// remoteBindings: false … wrangler.json の "remote": true を無視してローカル接続を強制する。
//                          これが無いと本番D1への認証を要求され Failed to fetch auth token で失敗する。
if (process.env.NODE_ENV === "development") {
  setupDevPlatform({ persist: true, remoteBindings: false });
}
```

これで役割分担が固定できます。

| コマンド | 接続先 | 用途 |
|---|---|---|
| `npm run dev` | 常にローカル（`.wrangler/state/`） | **普段の開発**。HMRが効き、保存即反映 |
| `npm run dev:remote` | `wrangler.json` の `"remote"` 次第 | 本番データでの最終確認のときだけ |

### なぜ `npm run dev:remote` を常用すべきでないか

現在の「開発には `npm run dev:remote` を使う」という運用には、実害が3つあります。

1. **遅い**。毎回 `@cloudflare/next-on-pages` のフルビルドが走るため、1文字直すたびに数十秒待つことになります。HMR（保存した瞬間に画面が変わる機能）も効きません。
2. **本番データを壊す。** `"remote": true` のときは管理画面の追加・編集・削除・一斉進級が
   すべて**本物の部員データ**に対して実行されます。動作確認のつもりの操作が本番反映されます。
3. **失敗を再現できない。** 本番DBには `active` な部員がいるため、モックへのフォールバックや
   データ0件時の表示崩れといった状態をローカルで再現できません。

### 現在の `wrangler.json` について

`"remote": false` に変更済みですが、この状態では **`npm run dev:remote` も本番につながりません**
（両方ローカルを見ます）。上記 `remoteBindings: false` を入れたうえで `wrangler.json` を
`"remote": true` に戻すのが、当初の意図どおりの構成です。

### 併せて：ローカルDBに実データを入れておく

ローカルD1が空だとモックデータが表示され、管理画面のCRUDが試せません（モックはDBではないため）。
[データベース運用ガイド](./database_guide.md) のDDLでテーブルを作り、ダミーを数件入れておくと
`npm run dev` だけで管理画面まで一通り動作確認できます。

```bash
npx wrangler d1 execute kindai-boxing-db --local --command "INSERT INTO members (name, grade, position, is_manager, faculty, weight_class, state, has_experience) VALUES ('テスト 太郎', '3年', '主将', 0, '情報学部', 60, 'active', 1);"
```

---

## 🔴 1. `npm run lint` が事実上機能していない

`eslint.config.mjs` の `ignores` にビルド成果物のディレクトリが不足しており、
`.vercel/output/` と `.wrangler/tmp/` の生成物まで検査対象になっています。

**確認方法**

```bash
npm run lint 2>&1 | tail -3
```

→ `✖ 29661 problems` と出ます。一方、ソースだけを検査すると **エラー0件** です。

```bash
npx eslint app components lib types
```

つまり「ソースは綺麗なのに lint が真っ赤」という状態で、警告が埋もれて意味をなしていません。

**修正案** — `eslint.config.mjs`

```js
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      ".vercel/**",
      ".wrangler/**",
      "next-env.d.ts",
    ],
  },
```

`.vercel/**` と `.wrangler/**` の2行を足すだけです。修正後は `npm run lint` が数秒で無言終了します。

---

## 🔴 2. 部員データのグラフが実データを見ていない

`components/public/recruit/DataSection.tsx` の末尾:

```tsx
<ExperienceRate total={23} />
```

すぐ上で `const total = students.length;` を計算しているのに、**`23` という固定値**を渡しています。
部員が増減しても未経験者率は「23人中」で計算され続けます。

さらにファイル冒頭:

```tsx
/** 経験者数（DBにカラムがないためハードコード） */
const EXPERIENCED_COUNT = 6;
```

コメントが**誤り**です。`members` テーブルには `has_experience` 列が実在し、
管理画面の「経験」チェックボックスからも入力できます（`lib/admin/member.config.ts`）。
つまりデータはあるのに使われていません。

**確認方法**: 管理画面で部員を1人追加してトップページを見ても、未経験者率の分母が変わらない。

**修正案** — `components/public/recruit/DataSection.tsx`

冒頭の `EXPERIENCED_COUNT` の定義を削除し、代わりに集計関数を置きます。

```tsx
/** 経験者数を実データから数える */
function countExperienced(members: Member[]): number {
  return members.filter((m) => Boolean(m.has_experience)).length;
}
```

`ExperienceRate` を props で受け取る形に変更します。

```tsx
/** 未経験者率カード */
function ExperienceRate({
  total,
  experienced,
}: {
  total: number;
  experienced: number;
}) {
  const inexperienced = total - experienced;
  const inexperiencedPct =
    total === 0 ? 0 : Math.round((inexperienced / total) * 100);
  const gradient = `conic-gradient(#dc2626 0% ${inexperiencedPct}%, #e5e7eb ${inexperiencedPct}% 100%)`;
```

同コンポーネント内の `{EXPERIENCED_COUNT}人` の表示も差し替えます。

```tsx
          <span className="text-gray-700">経験者 {experienced}人</span>
```

呼び出し側:

```tsx
        <ExperienceRate total={total} experienced={countExperienced(students)} />
```

> ⚠️ モックデータ（`lib/db/person.mock.ts`）は全員 `has_experience: false` なので、
> ローカルでは「未経験者率 100%」と表示されます。これは正しい挙動です。

---

## 🟡 3. `has_experience` の型が実態と食い違っている

| 場所 | 実際の値 |
|---|---|
| D1（`members.has_experience`） | `INTEGER`（`0` / `1`） |
| `InputCell` のチェックボックス | `onChange(e.target.checked ? 1 : 0)` → 数値 |
| `lib/db/person.mock.ts` | `false` → 真偽値 |
| `types/index.ts` の宣言 | `boolean \| null` |

同じフィールドが**DB経由なら数値、モック経由なら真偽値**という二重の姿になっています。
`is_manager` は正しく `0 | 1` と宣言されているので、それに揃えるべきです。

現状 `render: (v) => (v ? "経験者" : "未経験")` のような truthy 判定で動いているため表面化していませんが、
`has_experience === true` のような厳密比較を1箇所でも書いた瞬間に壊れます。

**修正案** — `types/index.ts`

```ts
  is_manager: 0 | 1;
  faculty: Faculty | null;
  weight_class: WeightClass | null;
  has_experience: 0 | 1;
```

この変更後、`npx tsc --noEmit` が以下2箇所の修正漏れを教えてくれます（型を先に直す利点）。

- `lib/db/person.mock.ts` … `has_experience: false` → `has_experience: 0`（全レコード）
- `lib/admin/member.config.ts` の `defaultValues` … `has_experience: false` → `has_experience: 0`

---

## 🟡 4. 一斉進級：コメントと実装が矛盾している

`components/admin/PromotionTable.tsx` の冒頭コメント:

```
 * 4年 → 卒業（state を graduated に変更）
```

しかし実装は**そうなっていません**。

```tsx
const NEXT_GRADE: Record<string, string | null> = {
  "4年": "院生",   // ← 卒業ではなく院生
```

`lib/db/member.repository.ts` の `promoteGrade()` の SQL も `WHEN '4年' THEN '院生'` です。
**一斉進級を実行すると、4年生が全員「院生」になります。** 卒業処理は行われません。

これは「コメントが古い」のか「実装が意図と違う」のかで対応が分かれます。仕様を決めてください。

- **案A（実装が正）**: 4年→院生で運用し、卒業は「状態変更」ページで `graduated` にする
  → コメントの `4年 → 卒業（state を graduated に変更）` を `4年 → 院生` に直すだけ
- **案B（コメントが正）**: 進級時に4年生を自動で卒業扱いにする
  → `NEXT_GRADE`、`promoteGrade()` の SQL、`promoteMembersAction` の3箇所を変更する必要あり

> 現状の運用（状態変更ページが独立して存在する）を見るかぎり、**案A が実態に近い**と思われます。

### 併せて：未知の学年がチェック可能になる

```tsx
const canPromote = (grade: string) => NEXT_GRADE[grade] !== null;
```

`NEXT_GRADE` に無い学年（DBに全角空白混じりの値が入っている等）は `undefined` を返し、
`undefined !== null` は **`true`** なので「進級可能」と判定されてしまいます。
チェックはできるのに SQL の `WHERE grade IN (...)` で弾かれ、何も起きません。

**修正案** — `components/admin/PromotionTable.tsx`

```tsx
  const canPromote = (grade: string) => NEXT_GRADE[grade] != null;
```

`!==` を `!=` にすると `undefined` と `null` の両方を除外できます（ESLint の `eqeqeq` には触れない書き方です）。
同じ理由で、表内の `const isPromotable = nextGrade !== null;` も `!= null` にしてください。

---

## 🟡 5. staff テーブルの `bio` 列がローカルDBに存在しない

`lib/db/staff.repository.ts` は INSERT / UPDATE で `bio` 列を使いますが、
ローカルD1（`.wrangler/state/v3/d1/`）の staff テーブルは以下の定義になっています。

```sql
CREATE TABLE staff (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, grade TEXT NOT NULL, state TEXT DEFAULT 'active')
```

`bio` がありません。`lib/db/client.ts` の `execute()` は例外を握りつぶして `false` を返すため、
**ローカルではスタッフの追加・更新が、エラー表示もなく黙って失敗します。**

**確認方法**: `npm run dev` で `/admin/staff/add` からスタッフを追加 → 一覧に出てこない。
サーバー側のログに `Execute failed:` が出ているはずです。

**修正コマンド**

```bash
npx wrangler d1 execute kindai-boxing-db --local --command "ALTER TABLE staff ADD COLUMN bio TEXT;"
```

本番DBに `bio` があるかどうかは Cloudflare ダッシュボードのD1コンソールで確認してください。
無ければ本番でも同じ現象が起きます。

---

## 🟡 6. 環境変数 `NEXT_PUBLIC_R2_BASE_URL` の供給経路

部員写真のURLは `lib/storage/client.ts` が組み立てます。

```ts
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL || "";
```

これを使う `PersonImage` は **Client Component**（`"use client"`）です。
`NEXT_PUBLIC_*` はクライアント向けには**ビルド時にソースへ文字列として焼き込まれます**。

一方 `wrangler.json` の `vars` は Worker の**実行時**バインディングであり、ビルド時には存在しません。

| 経路 | ビルド時に読めるか |
|---|---|
| `.env.local`（ローカル） | ✅ 読める（＝ローカルで動いている理由） |
| `wrangler.json` の `vars` | ❌ 読めない（実行時のみ） |
| Cloudflare Pages のビルド環境変数 | ✅ 読める |

`.env.local` は `.gitignore` されているため、**Cloudflare Pages 側のビルド環境変数に
`NEXT_PUBLIC_R2_BASE_URL` が登録されていないと、本番の画像URLが `/members/1.webp`（ドメイン抜け）になります。**

**確認方法**: 本番サイトで部員写真を右クリック→画像URLをコピーし、`https://storage.kindai-boxing.com/` から
始まっているか確認してください。始まっていれば登録済みで問題ありません。

未登録だった場合は Cloudflare Pages のプロジェクト設定 → Settings → Environment variables に
`NEXT_PUBLIC_R2_BASE_URL = https://storage.kindai-boxing.com` を追加します（`vars` とは別枠です）。

---

## 🟡 7. 編集モードで「行データ」と「ID」の取得元がずれている

`components/admin/PersonTable.tsx` の edit モード:

```tsx
onEdit={() =>
  onUpdate?.(
    data[index].id,
    rows[index] as Omit<T, "id" | "state">,
  )
}
```

- `rows` … `useEditableRows` が **マウント時の `data` から一度だけ**生成したスナップショット
- `data` … Server Action の `revalidatePath` 後に**差し替わる**最新データ

この2つを `index` で突き合わせているため、更新後に並び順や件数が変われば
**別人のIDに別人の入力値を書き込む**可能性があります。

**修正案** — `components/admin/useEditableRows.ts`

`rows` と同じスナップショットからIDも保持し、両者の対応を固定します。

```ts
  // rows と同じスナップショットから採ったID（edit モードでのみ使用）
  const [ids] = useState<number[]>(() =>
    mode === "edit" ? data.map((d) => d.id) : [],
  );

  return { rows, ids, isInputMode, updateField, addRow, removeRow };
```

`components/admin/PersonTable.tsx` 側:

```tsx
  const { rows, ids, isInputMode, updateField, addRow, removeRow } =
    useEditableRows(config, data, mode);
```

```tsx
                      onEdit={() =>
                        onUpdate?.(
                          ids[index],
                          rows[index] as Omit<T, "id" | "state">,
                        )
                      }
```

---

## 🟢 8. スタッフ紹介が「人名のコンポーネント」に直結している

`components/public/members/StaffSection.tsx`:

```tsx
{group.label === "部長" && <KiyotakiFumi person={persons[0]} />}
{group.label === "総監督" && <AkaiHidekazu person={persons[0]} />}
{group.label === "監督" && <NashiroNobuo person={persons[0]} />}
```

2つの構造的な問題があります。

1. **役職とコンポーネント名（＝人名）が固定で結ばれている。** DBの総監督を別の人に差し替えても、
   `AkaiHidekazu.tsx` というファイルが描画され続けます。中に紹介文がハードコードされていれば内容も前任者のままです。
2. **`persons[0]` しか描画されない。** 「監督」が2人登録されても、2人目は画面に出ません（エラーも出ません）。

急ぎではありませんが、人の入れ替えが起きたときに必ず踏む地雷です。
将来的には「役職ごとのレイアウト種別」で分岐し、紹介文は staff テーブルの `bio` 列から読む形に寄せるのが筋です（項目5と関連）。

---

## 🟢 9. 使われていないファイル（デッドコード）

以下は `app/` `components/` `lib/` のどこからも import されていません。
`PersonTable` に統合される前の旧実装の残骸です。

| ファイル | 状況 |
|---|---|
| `components/admin/MembersTable.tsx` | 未使用 |
| `components/admin/TableHeader.tsx` | `MembersTable` からのみ参照 → 実質未使用 |
| `components/admin/TableRow.tsx` | `MembersTable` からのみ参照 → 実質未使用 |
| `components/admin/InputRow.tsx` | 未使用 |

**確認方法**

```bash
grep -rn "MembersTable\|InputRow" app components lib --include=*.tsx --include=*.ts
```

自己参照しか出てこなければ削除して問題ありません。

同様に `package.json` の以下も、Cloudflare Access への移行で不要になった残骸です。

- `"generate-hash": "tsx scripts/generate-password-hash.ts"` … **参照先の `scripts/` ディレクトリが存在しません**
- devDependencies の `@types/bcrypt` … `bcrypt` 本体は入っておらず、Edge Runtime では動きません

---

## 🟢 10. 並び順の定義が3箇所に散らばっている

同じ「学年・役職の並び順」という知識が3箇所にコピーされています。

| 場所 | 形 |
|---|---|
| `lib/db/member.repository.ts` | SQL の `ORDER BY CASE grade WHEN '4年' THEN 1 ...` |
| `lib/service/person.service.ts` | `MEMBER_GRADE_ORDER` / `STAFF_GRADE_ORDER` 配列 |
| `lib/constants.ts` | `MEMBER_GRADES` / `STAFF_GRADES` |

しかも `STAFF_GRADES`（`総監督, 監督, コーチ, 部長`）と
`STAFF_GRADE_ORDER`（`部長, 総監督, 監督, コーチ`）で**順序が違います**。
片方だけ直して「直らない」と悩む典型パターンなので、役職を増減するときは3箇所すべてを確認してください。

---

## 🟢 11. 細かい不整合

| 箇所 | 内容 |
|---|---|
| `lib/storage/image.repository.ts` | `id` が falsy のとき `/images/default.png` を返すが、実ファイルは `public/images/default.webp`。`PersonImage` 側のデフォルトは `.webp` で正しい |
| `lib/service/person.service.ts` | `getMembers()` のJSDocは「役職順、学年順、ID順」だが、実際のSQLは**学年順 → 役職順 → ID順** |
| `app/(admin)/admin/page.tsx` | 「写真変更」ボタンが `/admin/{entity}/photo` を指すが、`[mode]` の許可値に `photo` が無いため404。R2へのアップロード機能自体が未実装 |
| `types/index.ts` | `GroupedMember.label` は `MemberGrade \| "マネージャー"` だが、`groupMembers()` 内で `key as MemberGrade` とキャストしており型が実態と合っていない |
