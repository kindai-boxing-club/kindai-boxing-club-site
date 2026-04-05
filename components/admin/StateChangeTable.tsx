/**
 * StateChangeTable — メンバーの状態（active/deleted/graduated）を変更するテーブル
 *
 * デフォルトは現役メンバーのみ表示。
 * 「退部・卒業も表示」ボタンで全メンバーを表示できる。
 * 変更があった行だけをまとめて送信する。
 */
"use client";

import { useState } from "react";
import { Member } from "@/types";

const STATE_LABELS: Record<string, string> = {
  active: "現役",
  graduated: "卒業",
  deleted: "退部",
};

const STATE_OPTIONS = Object.entries(STATE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

type Props = {
  members: Member[];
  onChangeState: (changes: { id: number; state: string }[]) => Promise<void>;
};

export default function StateChangeTable({ members, onChangeState }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [states, setStates] = useState<Record<number, string>>(() =>
    Object.fromEntries(members.map((m) => [m.id, m.state])),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 表示対象のメンバー
  const visibleMembers = showAll
    ? members
    : members.filter((m) => m.state === "active");

  const updateState = (id: number, newState: string) => {
    setStates((prev) => ({ ...prev, [id]: newState }));
  };

  const getChanges = () =>
    members
      .filter((m) => states[m.id] !== m.state)
      .map((m) => ({ id: m.id, state: states[m.id] }));

  const handleSubmit = async () => {
    const changes = getChanges();
    if (changes.length === 0) return;
    if (!confirm(`${changes.length}名の状態を変更します。よろしいですか？`))
      return;

    setIsSubmitting(true);
    await onChangeState(changes);
    setIsSubmitting(false);
  };

  const changedCount = getChanges().length;

  return (
    <div>
      {/* フィルタトグル */}
      <div className="mb-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-4 py-2 text-sm rounded border transition-colors ${
            showAll
              ? "bg-slate-800 text-white border-slate-800"
              : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
          }`}
        >
          {showAll ? "現役のみ表示" : "退部・卒業も表示"}
        </button>
      </div>

      <table className="min-w-full bg-white rounded shadow table-auto">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium">名前</th>
            <th className="px-4 py-3 text-left text-sm font-medium">学年</th>
            <th className="px-4 py-3 text-left text-sm font-medium">状態</th>
          </tr>
        </thead>
        <tbody>
          {visibleMembers.map((member) => {
            const isChanged = states[member.id] !== member.state;
            return (
              <tr
                key={member.id}
                className={`border-t ${isChanged ? "bg-yellow-50" : "hover:bg-gray-50"}`}
              >
                <td className="px-4 py-3 text-sm">{member.id}</td>
                <td className="px-4 py-3 text-sm">{member.name}</td>
                <td className="px-4 py-3 text-sm">{member.grade}</td>
                <td className="px-4 py-3">
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={states[member.id]}
                    onChange={(e) => updateState(member.id, e.target.value)}
                  >
                    {STATE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={changedCount === 0 || isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "処理中..." : `${changedCount}名の状態を変更`}
        </button>
        {changedCount > 0 && (
          <span className="text-sm text-yellow-600 font-medium">
            {changedCount}件の変更あり
          </span>
        )}
      </div>
    </div>
  );
}
