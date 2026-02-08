/**
 * @file app/(admin)/admin/members/delete/page.tsx
 * @description メンバー削除ページ
 *
 * 役割:
 * - 部員を削除する（確認ダイアログ付き）
 * - D1 データベースから DELETE する
 */

import MembersTable from "@/components/admin/MembersTable";

export default function MemberDeletePage() {
  return (
    <div className="space-y-4">
      <MembersTable mode="delete" />
    </div>
  );
}
