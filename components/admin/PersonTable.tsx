/** PersonTable — EntityConfig 駆動の統合テーブルコンポーネント */
"use client";

import { useState, useEffect } from "react";
import { EntityConfig, ColumnDef } from "@/lib/admin/entity.config";
import { useEditableRows } from "./useEditableRows";
import InputCell from "./InputCell";
import { MdDelete } from "react-icons/md";
import { addResult } from "@/types";

// ─── 型定義 ───────────────────────────────────────────

type Mode = "view" | "delete" | "edit" | "add";

type Props<T extends { id: number }> = {
  config: EntityConfig<T>;
  data: T[];
  mode: Mode;
  /** delete モード: 行を削除するコールバック */
  onDelete?: (id: number) => void;
  /** add モード: 新規行をまとめて送信するコールバック */
  onSubmit?: (
    rows: Omit<T, "id" | "state">[],
  ) => Promise<addResult | void> | void;
  /** edit モード: 変更行をまとめて送信するコールバック */
  onUpdate?: (
    updates: { id: number; data: Omit<T, "id"> }[],
  ) => void | Promise<void>;
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
  const {
    rows,
    ids,
    isInputMode,
    updateField,
    addRow,
    removeRow,
    isRowChanged,
    changedIndexes,
    commitRows,
    removeSuccessfulRows,
  } = useEditableRows(config, data, mode);

  // 一覧・編集画面でのみ「卒業・退部」の表示切り替えを提供する
  const showStateToggle = mode === "view" || mode === "edit";
  const [showInactive, setShowInactive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    subMessage?: string;
    type: "success" | "warning" | "error";
  } | null>(null);
  const isRowVisible = (index: number) =>
    !showStateToggle || showInactive || data[index]?.state === "active";

  const handleSave = async () => {
    if (changedIndexes.length === 0) return;
    const snapshot = rows;
    setIsSaving(true);
    await onUpdate?.(
      changedIndexes.map((i) => ({
        id: ids[i],
        data: snapshot[i] as Omit<T, "id">,
      })),
    );
    commitRows(snapshot);
    setIsSaving(false);
  };

  const handleAdd = async () => {
    if (rows.length === 0 || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await onSubmit?.(rows as Omit<T, "id" | "state">[]);
      if (result && "results" in result) {
        removeSuccessfulRows(result.results);
        const { successCount, failureCount } = result;
        const message = `${successCount}人成功 / ${failureCount}人失敗`;

        if (failureCount === 0) {
          setToast({ message, type: "success" });
        } else if (successCount > 0) {
          setToast({ message, type: "warning" });
        } else {
          setToast({ message, type: "error" });
        }
      }
    } catch {
      setToast({ message: "追加処理中にエラーが発生しました", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

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
      {toast && (
        <div
          role="alert"
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300 
          ${
            toast.type === "success"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : toast.type === "warning"
                ? "bg-amber-50 border-amber-300 text-amber-900"
                : "bg-rose-50 border-rose-300 text-rose-900"
          }`}
        >
          <div>
            <p>{toast.message}</p>
          </div>
        </div>
      )}
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
                        isRowChanged(index)
                          ? "bg-yellow-50"
                          : "hover:bg-gray-50"
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
                      {
                        // 操作ボタンは add モードの行削除のみ表示
                        mode === "add" && (
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => removeRow(index)}
                              disabled={isSubmitting}
                            >
                              <MdDelete size={20} className="text-red-500" />
                            </button>
                          </td>
                        )
                      }
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
        <div className="mt-4 flex gap-4 items-center justify-between">
          <button
            onClick={addRow}
            className="px-4 py-2 bg-slate-100 rounded hover:bg-slate-500"
          >
            + 行追加
          </button>
          <button
            onClick={handleAdd}
            disabled={isSubmitting || rows.length === 0}
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
