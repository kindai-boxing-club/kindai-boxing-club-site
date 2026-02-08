/**
 * @file components/admin/TableRow.tsx
 * @description テーブルの1行（データ表示）
 */

"use client";

import { ReactNode } from "react";
import { Person } from "@/types";
import { deleteMemberAction } from "@/lib/actions/members";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

type Props = {
  member: Person;
  columns: (keyof Person)[];
  mode: "view" | "edit" | "delete" | "add";
};

function TableCell({ children }: { children?: ReactNode }) {
  return <td className="px-4 py-3 text-sm">{children}</td>;
}

export default function TableRow({ member, columns, mode }: Props) {
  const handleDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      await deleteMemberAction(member.id);
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      {columns.map((key) => (
        <TableCell key={key}>
          {key === "is_manager"
            ? member[key]
              ? "◯"
              : ""
            : String(member[key] ?? "-")}
        </TableCell>
      ))}
      {mode === "edit" && (
        <TableCell>
          <button onClick={() => {}}>
            <MdEdit />
          </button>
        </TableCell>
      )}
      {mode === "delete" && (
        <TableCell>
          <button onClick={handleDelete}>
            <MdDelete />
          </button>
        </TableCell>
      )}
    </tr>
  );
}
