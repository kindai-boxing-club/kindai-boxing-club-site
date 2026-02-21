/** メンバー削除ページ */

import MembersTable from "@/components/admin/MembersTable";

export const runtime = "edge";

export default function MemberDeletePage() {
  return (
    <div className="space-y-4">
      <MembersTable mode="delete" />
    </div>
  );
}
