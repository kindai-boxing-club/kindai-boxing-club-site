/**
 * @file components/admin/TableRow.tsx
 * @description テーブルの1行（データ表示）
 */

import { Person } from "@/types";

type Props = {
  member: Person;
  columns: string[];
};

export default function TableRow({ member, columns }: Props) {
  return (
    <tr className="border-t hover:bg-gray-50">
      {columns.map((key) => (
        <td key={key} className="px-4 py-3 text-sm">
          {key === "is_manager"
            ? member[key as keyof Person]
              ? "◯"
              : ""
            : (member[key as keyof Person] ?? "-")}
        </td>
      ))}
    </tr>
  );
}
