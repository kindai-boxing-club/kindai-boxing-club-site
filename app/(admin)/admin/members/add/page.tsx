/**
 * @file app/(admin)/admin/members/add/page.tsx
 * @description メンバー追加ページ
 *
 * 役割:
 * - 新規部員をフォームから登録する
 * - D1 データベースに INSERT する
 */

import { addMember } from "./actions";

export default function MemberAddPage() {
  return (
    <form action={addMember} className="space-y-4">
      {/* 名前: 自由入力 */}
      <input name="name" placeholder="名前" required />

      {/* 学年: 選択 */}
      <select name="grade" required>
        <option value="1年">1年</option>
        <option value="2年">2年</option>
        <option value="3年">3年</option>
        <option value="4年">4年</option>
        <option value="院生">院生</option>
      </select>

      {/* 役職: 選択（空も可） */}
      <select name="position">
        <option value="">なし</option>
        <option value="主将">主将</option>
        <option value="副将">副将</option>
        <option value="主務">主務</option>
      </select>

      {/* 学部: 自由入力 */}
      <input name="faculty" placeholder="学部" required />

      {/* マネージャー: チェックボックス */}
      <label>
        <input type="checkbox" name="is_manager" />
        マネージャー
      </label>

      {/* 階級: 選択（空も可） */}
      <select name="weight_class">
        <option value="50">50</option>
        <option value="55">55</option>
        <option value="60">60</option>
        <option value="65">65</option>
        <option value="70">70</option>
        <option value="75">75</option>
      </select>
      <button type="submit">追加</button>
    </form>
  );
}
