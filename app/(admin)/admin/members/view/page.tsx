/**
 * @file app/(admin)/admin/members/page.tsx
 * @description メンバー一覧ページ
 */

import MembersTable from "@/components/admin/MembersTable";

export const runtime = "edge";

export default async function MembersListPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">メンバー一覧</h1>
      <MembersTable />
    </div>
  );
}
