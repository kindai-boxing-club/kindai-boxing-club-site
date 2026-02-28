/** メンバー追加ページ */

"use client";

import { useState } from "react";
import { MemberInput } from "@/types";
import { addMembersAction } from "@/lib/actions/person.action";
import TableHeader from "@/components/admin/TableHeader";
import InputRow from "@/components/admin/InputRow";
import { useRouter } from "next/navigation";
import { MdAddCircleOutline } from "react-icons/md";

const defaultValues: MemberInput = {
  name: "",
  grade: "1年",
  position: null,
  is_manager: 0,
  faculty: "",
  weight_class: null,
  has_experience: false,
};

const MEMBER_TABLE_COLUMNS = [
  "名前",
  "学年",
  "役職",
  "学部",
  "階級",
  "マネ",
  "操作",
] as const;

export default function MemberAddPage() {
  const [rows, setRows] = useState<MemberInput[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // 行を追加
  const handleAddRow = () => {
    setRows([...rows, defaultValues]);
  };

  // 行を削除
  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // 入力内容を変更
  const handleChange = <K extends keyof MemberInput>(
    index: number,
    field: K,
    value: MemberInput[K],
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  // 送信処理
  const handleSubmit = async () => {
    if (rows.some((row) => !row.name.trim())) {
      alert("すべての行に名前を入力してください。");
      return;
    }

    if (!confirm(`${rows.length}件のメンバーを追加しますか？`)) return;

    setIsSubmitting(true);
    try {
      const membersToAdd = rows;
      await addMembersAction(membersToAdd);
      alert("メンバーを追加しました。");
      setRows([]);
      router.push("/admin/members/view"); // 一覧に戻る
    } catch (error) {
      console.error(error);
      alert("メンバーの追加に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">メンバー追加</h1>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <TableHeader columns={MEMBER_TABLE_COLUMNS} mode="add" />
          <tbody>
            {rows.map((row, index) => (
              <InputRow
                key={index}
                member={row}
                onChange={(field, value) => handleChange(index, field, value)}
                onRemove={() => handleRemoveRow(index)}
              />
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            下の「＋」ボタンを押してメンバーを追加してください
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleAddRow}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-2xl shadow"
        >
          <MdAddCircleOutline size={24} />
        </button>
      </div>

      <div className="flex justify-end p-4 border-t mt-4 bg-gray-50 fixed bottom-0 left-0 right-0 z-10 md:static md:bg-transparent md:border-none">
        <button
          onClick={handleSubmit}
          disabled={rows.length === 0 || isSubmitting}
          className={`
            font-bold py-3 px-8 rounded shadow text-lg
            ${
              rows.length === 0 || isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }
          `}
        >
          {isSubmitting ? "追加中..." : "追加する"}
        </button>
      </div>
    </div>
  );
}
