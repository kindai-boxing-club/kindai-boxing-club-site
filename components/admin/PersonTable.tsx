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
 *                  ただし col.field.editOnly は edit モードのみ表示（例: state）
 *
 * view/edit モードには「卒業・退部」の表示切り替えボタンを表示する。
 * デフォルトは非表示（現役のみ）。
 */
"use client";

import { useState } from "react";
import { EntityConfig, ColumnDef } from "@/lib/admin/entity.config";
import { useEditableRows } from "./useEditableRows";
import InputCell from "./InputCell";
import { MdDelete } from "react-icons/md";

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
  /** edit モード: 変更行をまとめて送信するコールバック */
  onUpdate?: (updates:{id:number; data:Omit<T, "id">}[]) => void | Promise<void>
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
  const { rows, ids, isInputMode, updateField, addRow, removeRow,isRowChanged, changedIndexes, commitRows, } =
    useEditableRows(config, data, mode);

  // 一覧・編集画面でのみ「卒業・退部」の表示切り替えを提供する
  const showStateToggle = mode === "view" || mode === "edit";
  const [showInactive, setShowInactive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isRowVisible = (index: number) =>
    !showStateToggle || showInactive || data[index]?.state === "active";

  const handleSave = async () => {
    if(changedIndexes.length === 0) return;
    const snapshot = rows;
    setIsSaving(true);
    await onUpdate?.(
      changedIndexes.map((i) => ({
        id: ids[i],
        data: snapshot[i] as Omit<T, "id">,
      }))
    );
    commitRows(snapshot);
    setIsSaving(false);
  }

  // 表示するカラムを決定
  // - view/delete: 全カラム表示（id, state 含む）
  // - add:         field があり、editOnly ではないカラムだけ
  // - edit:        field があるカラムすべて（state を含む）
  const visibleColumns = isInputMode
    ? config.columns.filter(
        (col) => col.field && (mode === "edit" || !col.field.editOnly),
      )
    : config.columns;

  return (
    <div>
      {/* ─── 卒業・退部の表示切り替え（view/edit） ─── */}
      {showStateToggle && (
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowInactive((v) => !v)}
            className={`px-4 py-2 text-sm rounded border transition-colors ${
              showInactive
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
            }`}
          >
            {showInactive
              ? "卒業・退部を表示中"
              : "卒業・退部をフィルタリング中"}
          </button>

          {mode === "edit" && (
            <SaveChangesButton
              count={changedIndexes.length}
              isSaving={isSaving}
              onClick={handleSave}
            />
          )}
        </div>
      )}

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
          </tr>
        </thead>

        {/* ─── ボディ ─── */}
        <tbody>
          {isInputMode
            ? /* === 入力モード（add / edit） === */
              rows.map(
                (row, index) =>
                  isRowVisible(index) && (
                    <tr
                      key={index}
                      // ↓ 変更のある行を黄色くハイライト
                      className={`border-t ${
                        isRowChanged(index) ? "bg-yellow-50" : "hover:bg-gray-50"
                      }`}
                    >
                      {visibleColumns.map((col) => (
                        <td key={col.key} className="px-4 py-2">
                          {col.field && (
                            <InputCell
                              field={col.field}
                              value={row[col.key]}
                              onChange={(val) =>
                                updateField(index, col.key, val)
                              }
                            />
                          )}
                        </td>
                      ))}
                      {// 操作ボタンは add モードの行削除のみ表示
                      mode === "add" && (
                        <td className="px-4 py-2 text-center">
                          <button onClick={() => removeRow(index)}>
                            <MdDelete size={20} className="text-red-500" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ),
              )
            : /* === 表示モード（view / delete） === */
              data.map(
                (row, index) =>
                  isRowVisible(index) && (
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
                  ),
              )}
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
      {/* ─── edit モード: 画面下部右の保存ボタン ─── */}
      {mode === "edit" && (
        <div className="mt-4 flex justify-end">
          <SaveChangesButton
            count={changedIndexes.length}
            isSaving={isSaving}
            onClick={handleSave}
          />
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
 * SaveChangesButton — 変更のある行をまとめて保存するボタン（上部・下部で共用）
 */
function SaveChangesButton({
  count,
  isSaving,
  onClick,
}: {
  count: number;
  isSaving: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={count === 0 || isSaving}
      className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSaving ? "保存中..." : `${count}行の変更を保存`}
    </button>
  );
}