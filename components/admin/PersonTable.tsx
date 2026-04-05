/**
 * PersonTable — EntityConfig 駆動の統合テーブルコンポーネント
 *
 * ┌──────────────────────────────────────────────────────┐
 * │  アーキテクチャ概要                                  │
 * │                                                      │
 * │  PersonTable（このファイル）                          │
 * │    ├─ useEditableRows  … 行データの状態管理フック     │
 * │    └─ InputCell        … field.type に基づく入力UI   │
 * │                                                      │
 * │  4つのモード:                                         │
 * │    view   → 全カラムをテキスト表示                    │
 * │    delete → テキスト表示 ＋ 🗑削除ボタン              │
 * │    add    → field ありカラムを入力UI ＋ 行追加/削除   │
 * │    edit   → field ありカラムを入力UI ＋ 💾保存ボタン  │
 * └──────────────────────────────────────────────────────┘
 *
 * セルの描画ルール:
 *   - view/delete: col.render があればカスタム描画、なければ String(value)
 *   - add/edit:    col.field があるカラムだけ表示 → InputCell で描画
 */
"use client";

import { EntityConfig, ColumnDef } from "@/lib/admin/entity.config";
import { useEditableRows } from "./useEditableRows";
import InputCell from "./InputCell";
import { MdDelete, MdSave } from "react-icons/md";

// ─── 型定義 ───────────────────────────────────────────

type Mode = "view" | "delete" | "edit" | "add";

type Props<T extends { id: number }> = {
  config: EntityConfig<T>;
  data: T[];
  mode: Mode;
  /** delete モード: 行を削除するコールバック */
  onDelete?: (id: number) => void;
  /** add モード: 新規行をまとめて送信するコールバック */
  onSubmit?: (rows: Omit<T, "id" | "state">[]) => void;
  /** edit モード: 1行ずつ更新するコールバック */
  onUpdate?: (id: number, updates: Omit<T, "id" | "state">) => void;
};

// ─── メインコンポーネント ─────────────────────────────

export default function PersonTable<T extends { id: number; state: string }>({
  config,
  data,
  mode,
  onDelete,
  onSubmit,
  onUpdate,
}: Props<T>) {
  // 状態管理はカスタムフックに委譲
  const { rows, isInputMode, updateField, addRow, removeRow } = useEditableRows(
    config,
    data,
    mode,
  );

  // 表示するカラムを決定
  // - view/delete: 全カラム表示（id, state 含む）
  // - add/edit:    field 定義があるカラムだけ（入力可能なもののみ）
  const visibleColumns = isInputMode
    ? config.columns.filter((col) => col.field)
    : config.columns;

  // アクション列（操作ボタン）を表示するか
  const hasActionColumn = mode !== "view";

  return (
    <div>
      <table className="min-w-full bg-white rounded shadow table-auto">
        {/* ─── ヘッダー ─── */}
        <thead className="bg-slate-100">
          <tr>
            {visibleColumns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-sm font-medium"
              >
                {col.label}
              </th>
            ))}
            {hasActionColumn && (
              <th className="px-4 py-3 text-left text-sm font-medium">操作</th>
            )}
          </tr>
        </thead>

        {/* ─── ボディ ─── */}
        <tbody>
          {isInputMode
            ? /* === 入力モード（add / edit） === */
              rows.map((row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  {visibleColumns.map((col) => (
                    <td key={col.key} className="px-4 py-2">
                      {col.field && (
                        <InputCell
                          field={col.field}
                          value={row[col.key]}
                          onChange={(val) => updateField(index, col.key, val)}
                        />
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-center">
                    <ActionButton
                      mode={mode}
                      onAdd={() => removeRow(index)}
                      onEdit={() =>
                        onUpdate?.(
                          data[index].id,
                          rows[index] as Omit<T, "id" | "state">,
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            : /* === 表示モード（view / delete） === */
              data.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  {visibleColumns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm">
                      <ViewCell col={col} row={row} />
                    </td>
                  ))}
                  {mode === "delete" && (
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          if (confirm("削除しますか？")) onDelete?.(row.id);
                        }}
                      >
                        <MdDelete size={20} className="text-red-500" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>

      {/* ─── add モード: テーブル下部の操作ボタン ─── */}
      {mode === "add" && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={addRow}
            className="px-4 py-2 bg-slate-100 rounded hover:bg-slate-200"
          >
            + 行追加
          </button>
          <button
            onClick={() => onSubmit?.(rows as Omit<T, "id" | "state">[])}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            追加
          </button>
        </div>
      )}
    </div>
  );
}

// ─── サブコンポーネント ───────────────────────────────

/**
 * ViewCell — 表示モード用のセル描画
 * render 関数があればカスタム描画、なければテキスト表示
 */
function ViewCell<T extends { id: number }>({
  col,
  row,
}: {
  col: ColumnDef<T>;
  row: T;
}) {
  return (
    <>
      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
    </>
  );
}

/**
 * ActionButton — モードに応じた操作ボタン
 * add → 🗑（行削除）、edit → 💾（保存）
 */
function ActionButton({
  mode,
  onAdd,
  onEdit,
}: {
  mode: Mode;
  onAdd: () => void;
  onEdit: () => void;
}) {
  if (mode === "add") {
    return (
      <button onClick={onAdd}>
        <MdDelete size={20} className="text-red-500" />
      </button>
    );
  }
  if (mode === "edit") {
    return (
      <button onClick={onEdit}>
        <MdSave size={20} className="text-blue-500" />
      </button>
    );
  }
  return null;
}
