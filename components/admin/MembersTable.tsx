/**
 * @file components/admin/MembersTable.tsx
 * @description メンバー一覧テーブル（Server Component）
 */

import { getMembers } from "@/lib/data/dbMembers";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "名前" },
  { key: "grade", label: "学年" },
  { key: "position", label: "役職" },
  { key: "faculty", label: "学部" },
  { key: "weight_class", label: "階級" },
  { key: "is_manager", label: "マネ" },
] as const;

export default async function MembersTable() {
  const members = await getMembers();

  return (
    <table className="min-w-full bg-white rounded shadow table-auto">
      <TableHeader columns={columns.map((col) => col.label)} />

      <tbody>
        {members.map((m) => (
          <TableRow
            key={m.id}
            member={m}
            columns={columns.map((col) => col.key)}
          />
        ))}
      </tbody>
    </table>
  );
}
