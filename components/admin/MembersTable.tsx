/** メンバー一覧テーブル（Server Component） */

import * as personRepository from "@/lib/db/person.repository";
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

const columnKey = columns.map((col) => col.key);

export default async function MembersTable({
  mode,
}: {
  mode: "view" | "edit" | "delete";
}) {
  const members = await personRepository.getAll();

  return (
    <table className="min-w-full bg-white rounded shadow table-auto">
      <TableHeader columns={columns.map((col) => col.label)} mode={mode} />

      <tbody>
        {members.map((m) => (
          <TableRow key={m.id} member={m} columns={columnKey} mode={mode} />
        ))}
      </tbody>
    </table>
  );
}
