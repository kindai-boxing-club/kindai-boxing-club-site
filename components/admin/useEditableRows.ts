/**
 * useEditableRows — 追加・編集モードの行データを管理するカスタムフック
 *
 * PersonTable から状態管理のロジックを分離し、テーブル本体を
 * 「描画だけ」に集中させるために切り出したフック。
 *
 * - add モード: defaultValues から新規行を生成し、行の追加・削除を管理
 * - edit モード: 既存データ（data）から id/state を除いた編集用コピーを作成
 */

import { useState } from "react";
import { EntityConfig } from "@/lib/admin/entity.config";

/** 行データ型（id と state を除いた編集可能なフィールド群） */
type RowData = Record<string, unknown>;

/**
 * 既存データから、編集に不要な id と state を除外したオブジェクトを生成
 */
function stripIdAndState<T>(row: T): RowData {
  return Object.fromEntries(
    Object.entries(row as Record<string, unknown>).filter(
      ([key]) => key !== "id" && key !== "state",
    ),
  );
}

export function useEditableRows<T extends { id: number; state: string }>(
  config: EntityConfig<T>,
  data: T[],
  mode: "view" | "delete" | "add" | "edit",
) {
  const isInputMode = mode === "add" || mode === "edit";

  // add モード: defaultValues を初期行として1行用意
  // edit モード: data から id/state を除いた編集用コピーを作成
  const [rows, setRows] = useState<RowData[]>(() =>
    mode === "edit"
      ? data.map(stripIdAndState)
      : [{ ...config.defaultValues } as RowData],
  );

  /** 指定行の指定フィールドを更新 */
  const updateField = (index: number, key: string, value: unknown) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  };

  /** 新しい空行を末尾に追加（add モード用） */
  const addRow = () => {
    setRows((prev) => [...prev, { ...config.defaultValues } as RowData]);
  };

  /** 指定行を削除 */
  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  return { rows, isInputMode, updateField, addRow, removeRow };
}
