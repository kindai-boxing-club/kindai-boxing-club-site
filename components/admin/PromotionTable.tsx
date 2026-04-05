/**
 * PromotionTable — 一斉進級用のテーブル
 *
 * チェックボックスで対象を選択し、「進級」ボタンで学年を一つ進める。
 * 4年 → 卒業（state を graduated に変更）
 * 院生 → 進級不可（チェック不可）
 */
"use client";

import { useState } from "react";
import { Member } from "@/types";

/** 学年の進級マップ */
const NEXT_GRADE: Record<string, string | null> = {
  "1年": "2年",
  "2年": "3年",
  "3年": "4年",
  "4年": "院生",
  院生: null, // 進級不可
};

type Props = {
  members: Member[];
  onPromote: (ids: number[]) => Promise<void>;
};

export default function PromotionTable({ members, onPromote }: Props) {
  // 進級可能なメンバー（4年以外。4年は「卒業」なので別扱いにもできるが、ここでは含めない）
  // 院生は進級先がないのでチェック不可
  const canPromote = (grade: string) => NEXT_GRADE[grade] !== null;

  // 初期状態: 進級可能なメンバーは全選択
  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(members.filter((m) => canPromote(m.grade)).map((m) => m.id)),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const promotable = members.filter((m) => canPromote(m.grade));
    if (selected.size === promotable.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(promotable.map((m) => m.id)));
    }
  };

  const handlePromote = async () => {
    if (selected.size === 0) return;
    if (!confirm(`${selected.size}名を進級させます。よろしいですか？`)) return;

    setIsSubmitting(true);
    await onPromote(Array.from(selected));
    setIsSubmitting(false);
  };

  const promotableCount = members.filter((m) => canPromote(m.grade)).length;

  return (
    <div>
      <table className="min-w-full bg-white rounded shadow table-auto">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-center w-12">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={
                  selected.size === promotableCount && promotableCount > 0
                }
                onChange={toggleAll}
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium">名前</th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              現在の学年
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">進級後</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const nextGrade = NEXT_GRADE[member.grade];
            const isPromotable = nextGrade !== null;

            return (
              <tr key={member.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selected.has(member.id)}
                    disabled={!isPromotable}
                    onChange={() => toggle(member.id)}
                  />
                </td>
                <td className="px-4 py-3 text-sm">{member.id}</td>
                <td className="px-4 py-3 text-sm">{member.name}</td>
                <td className="px-4 py-3 text-sm">{member.grade}</td>
                <td className="px-4 py-3 text-sm">
                  {isPromotable ? (
                    <span className="text-blue-600 font-medium">
                      {nextGrade}
                    </span>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handlePromote}
          disabled={selected.size === 0 || isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "処理中..." : `${selected.size}名を進級`}
        </button>
        <span className="text-sm text-slate-500">
          {selected.size} / {promotableCount} 名選択中
        </span>
      </div>
    </div>
  );
}
