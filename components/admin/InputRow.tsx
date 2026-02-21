/** メンバー追加フォームの入力行 */

import { Grade, PersonFormInput, Position } from "@/types";
import { GRADES, POSITIONS, WEIGHT_CLASSES } from "@/lib/constants";
import { MdDelete } from "react-icons/md";

type Props = {
  member: PersonFormInput;
  onChange: <K extends keyof PersonFormInput>(
    field: K,
    value: PersonFormInput[K],
  ) => void;
  onRemove: () => void;
};

export default function InputRow({ member, onChange, onRemove }: Props) {
  return (
    <tr className="border-t hover:bg-gray-50">
      {/* 姓 */}
      <td className="px-4 py-2">
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          placeholder="姓"
          value={member.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
        />
      </td>

      {/* 名 */}
      <td className="px-4 py-2">
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          placeholder="名"
          value={member.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
        />
      </td>

      {/* 学年・役職 */}
      <td className="px-4 py-2">
        <select
          className="w-full border rounded px-2 py-1"
          value={member.grade}
          onChange={(e) => onChange("grade", e.target.value as Grade)}
        >
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </td>

      {/* 役職 (学生のみ) */}
      <td className="px-4 py-2">
        <select
          className="w-full border rounded px-2 py-1"
          value={member.position || ""}
          onChange={(e) =>
            onChange("position", (e.target.value || null) as Position | null)
          }
        >
          <option value="">なし</option>
          {POSITIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </td>

      {/* 学部 */}
      <td className="px-4 py-2">
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          placeholder="学部"
          value={member.faculty}
          onChange={(e) => onChange("faculty", e.target.value)}
        />
      </td>

      {/* 階級 */}
      <td className="px-4 py-2">
        <select
          className="w-full border rounded px-2 py-1"
          value={member.weight_class || ""}
          onChange={(e) => onChange("weight_class", e.target.value || null)}
        >
          <option value="">なし</option>
          {WEIGHT_CLASSES.map((w) => (
            <option key={w} value={w}>
              {w}kg
            </option>
          ))}
        </select>
      </td>

      {/* マネージャー */}
      <td className="px-4 py-2 text-center">
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={member.is_manager === 1}
          onChange={(e) => onChange("is_manager", e.target.checked ? 1 : 0)}
        />
      </td>

      {/* 削除ボタン */}
      <td className="px-4 py-2 text-center">
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
          type="button"
        >
          <MdDelete size={20} />
        </button>
      </td>
    </tr>
  );
}
