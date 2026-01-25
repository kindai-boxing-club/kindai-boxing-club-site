/**
 * @file app/(admin)/admin/members/page.tsx
 * @description メンバー一覧ページ
 */

import { getMembers } from "@/lib/data/dbMembers";

export const runtime = "edge";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "名前" },
  { key: "grade", label: "学年" },
  { key: "position", label: "役職" },
  { key: "faculty", label: "学部" },
  { key: "is_manager", label: "マネージャー" },
  { key: "weight_class", label: "階級" },
] as const;

export default async function MembersListPage() {
  const members = await getMembers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">メンバー一覧</h1>

      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left text-sm font-medium"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-sm">
                  {col.key === "is_manager"
                    ? member[col.key]
                      ? "◯"
                      : ""
                    : String(member[col.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
