/**
 * @file app/(admin)/admin/members/add/page.tsx
 * @description メンバー追加ページ
 *
 * 役割:
 * - 新規部員をフォームから登録する
 * - D1 データベースに INSERT する
 */

"use client";

import { useState } from "react";
import { PersonFormInput, PersonInput } from "@/types";
import { addMembersAction } from "@/lib/actions/members";
import TableHeader from "@/components/admin/TableHeader";
import InputRow from "@/components/admin/InputRow";
import { useRouter } from "next/navigation";
import { MdAddCircleOutline } from "react-icons/md";

import { MEMBER_TABLE_COLUMNS, DEFAULT_MEMBER_VALUES } from "@/lib/constants";

export default function MemberAddPage() {
  const [rows, setRows] = useState<PersonFormInput[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // 行を追加
  const handleAddRow = () => {
    setRows([...rows, { ...DEFAULT_MEMBER_VALUES }]);
  };

  // 行を削除
  const handleRemoveRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // 入力内容を変更
  const handleChange = <K extends keyof PersonFormInput>(
    index: number,
    field: K,
    value: PersonFormInput[K],
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  // フォーム入力をDB用の形式に変換（姓名を結合）
  const convertToPersonInput = (formInput: PersonFormInput): PersonInput => ({
    name: `${formInput.lastName} ${formInput.firstName}`,
    grade: formInput.grade,
    position: formInput.position,
    is_manager: formInput.is_manager,
    faculty: formInput.faculty,
    weight_class: formInput.weight_class,
  });

  // 送信処理
  const handleSubmit = async () => {
    if (rows.some((row) => !row.lastName.trim() || !row.firstName.trim())) {
      alert("すべての行に姓と名を入力してください。");
      return;
    }

    if (!confirm(`${rows.length}件のメンバーを追加しますか？`)) return;

    setIsSubmitting(true);
    try {
      // PersonFormInput を PersonInput に変換して送信
      const membersToAdd = rows.map(convertToPersonInput);
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
