# 命名規則リファクタリングガイド

## 目標

呼び方を統一する：

| 英語     | 日本語     | 説明                           |
| -------- | ---------- | ------------------------------ |
| `person` | 人         | 基底型（全員に共通するデータ） |
| `member` | 選手       | 競技を行う部員                 |
| `staff`  | 指導者等   | 監督、コーチ、部長など         |
| `team`   | チーム全体 | person の集合                  |

## まだ触らないもの

- DBテーブル名 `members`（変更リスクが高い）
- R2 画像パス `/members/{id}.webp`（既存URLが壊れる）

---

## 影響範囲マップ

### 変更するファイル

#### DB接続統一

- [ ] `lib/db/members.ts` — `getMembers()` にモックフォールバック追加
- [ ] `components/public/members/MemberSection.tsx` — import先を `@/lib/db/members` に変更
- [ ] `lib/data/dbMembers.ts` — **削除**

#### 定数の重複整理

- [ ] `lib/domain/MemberCollection.ts` — `MEMBER_GRADE_ORDER`, `STAFF_GRADE_ORDER` を外部に移動
- [ ] `lib/config/constants.ts` — `memberClassificationOrder` と `MEMBER_GRADE_ORDER` の重複を統合
- [ ] `components/public/members/MemberSection.tsx` — 定数の import先を更新
- [ ] `components/public/members/StaffSection.tsx` — 定数の import先を更新

#### ドメイン層リネーム

- [ ] `lib/domain/MemberCollection.ts` → ファイル名変更: `TeamCollection.ts`
- [ ] `lib/domain/TeamCollection.ts` — クラス名 `MemberCollection` → `TeamCollection`
- [ ] `components/public/members/MemberSection.tsx` — import更新
- [ ] `components/public/members/StaffSection.tsx` — import更新

#### ユーティリティのリネーム

- [ ] `lib/utils/path.ts` — `getMemberImage()` → `getPersonImage()`
- [ ] `components/public/ui/PersonImage.tsx` — import名を `getPersonImage` に更新

#### 公開サイト prop名統一

- [ ] `components/public/members/PersonCard.tsx` — prop `member` → `person`
- [ ] `components/public/members/Grid.tsx` — prop `members` → `people`, `onMemberClick` → `onPersonClick`
- [ ] `components/public/members/TeamMemberModal.tsx` — prop `member` → `person`
- [ ] `components/public/members/MemberSectionClient.tsx` — 変数名追従
- [ ] `components/public/members/StaffSection.tsx` — `selectedMember` → `selectedPerson`

### 変更しないファイル

- `types/index.ts` — `Person` は基底型として正しい
- `lib/db/client.ts` — 汎用クライアント
- `lib/db/members.ts` — 関数名は DB テーブル名 `members` と整合
- `lib/data/mockMembers.ts` — フォールバック用として残す
- `lib/actions/members.ts` — 管理画面の member CRUD として適切
- `lib/constants.ts` — 管理画面用定数
- `components/admin/MembersTable.tsx` — 管理画面なので `member` のまま
- `components/admin/TableRow.tsx` — 同上
- `components/admin/InputRow.tsx` — 同上
- `components/public/members/AkaiHidekazu.tsx` — すでに `person` 変数名で正しい
- `components/public/members/KiyotakiFumi.tsx` — 同上
- `components/public/members/NashiroNobuo.tsx` — 同上
- `public/person/coaches.ts` — ディレクトリ名 `person/` で正しい
- `app/(admin)/admin/members/add/page.tsx` — 管理画面
- `app/(admin)/admin/members/add/actions.ts` — 管理画面
- `app/(admin)/admin/members/delete/page.tsx` — 管理画面
- `app/(admin)/admin/members/view/page.tsx` — 管理画面
- `app/(admin)/admin/members/edit/page.tsx` — 管理画面

---

## 手順

### フェーズ 1: DB接続経路の統一

- [ ] `lib/db/members.ts` — `getMembers()` にモックフォールバックを追加
- [ ] `components/public/members/MemberSection.tsx` — import先を `@/lib/db/members` に変更
- [ ] `lib/data/dbMembers.ts` — **削除**
- [ ] 確認: `npx tsc --noEmit` → `npm run pages:build`

### フェーズ 2: 定数の重複整理

- [ ] `lib/domain/MemberCollection.ts` — `MEMBER_GRADE_ORDER`, `STAFF_GRADE_ORDER` を外部に移動
- [ ] `lib/config/constants.ts` — 重複定数を統合
- [ ] `components/public/members/MemberSection.tsx` — import先を更新
- [ ] `components/public/members/StaffSection.tsx` — import先を更新
- [ ] 確認: `npx tsc --noEmit` → `npm run pages:build`

### フェーズ 3: ドメイン層リネーム

- [ ] `lib/domain/MemberCollection.ts` → ファイル名変更: `TeamCollection.ts`
- [ ] `lib/domain/TeamCollection.ts` — クラス名を変更
- [ ] `components/public/members/MemberSection.tsx` — import更新
- [ ] `components/public/members/StaffSection.tsx` — import更新
- [ ] 確認: `npx tsc --noEmit` → `npm run pages:build`

### フェーズ 4: ユーティリティのリネーム

- [ ] `lib/utils/path.ts` — 関数名を変更
- [ ] `components/public/ui/PersonImage.tsx` — import名を更新
- [ ] 確認: `npx tsc --noEmit` → `npm run pages:build`

### フェーズ 5: 公開サイトの prop名統一

- [ ] `components/public/members/PersonCard.tsx` — `member` → `person`
- [ ] `components/public/members/Grid.tsx` — `members` → `people`, `onMemberClick` → `onPersonClick`
- [ ] `components/public/members/TeamMemberModal.tsx` — `member` → `person`
- [ ] `components/public/members/MemberSectionClient.tsx` — 変数名追従
- [ ] `components/public/members/StaffSection.tsx` — `selectedMember` → `selectedPerson`
- [ ] 確認: `npx tsc --noEmit` → `npm run pages:build`

### 完了後

- [ ] 全ページの動作確認（公開サイト + 管理画面）
- [ ] git コミット & プッシュ
