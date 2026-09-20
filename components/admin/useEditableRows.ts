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

/** 行データ型（id を除いた編集可能なフィールド群） */
type RowData = Record<string, unknown>;

/**
 * 既存データから、編集に不要な id を除外したオブジェクトを生成
 */
function stripId<T>(row: T): RowData {
  return Object.fromEntries(
    Object.entries(row as Record<string, unknown>).filter(
      ([key]) => key !== "id",
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
      ? data.map(stripId)
      : [{ ...config.defaultValues } as RowData],
  );

  // rows と同じスナップショットから採ったID（edit モードでのみ使用）
  // data は revalidatePath 後に差し替わるため、rows とはズレ得る。
  // 同じタイミングで採った ids を使うことで、保存時に index がズレても
  // 別人のIDに書き込まれないようにする。
  const [ids] = useState<number[]>(() =>
    mode === "edit" ? data.map((d) => d.id) : [],
  );

  // 保存済みの値(= 変更検知の基準)。保存成功時にcommitRowsで更新する
  const [baseline, setBaseline] = useState<RowData[]>(() =>
    mode === "edit" ? data.map(stripId) : [],
  );

  // 行に変更があるか。
  const isRowChanged = (index: number) => {
    const base = baseline[index];
    if (!base) return false;
    return Object.keys(rows[index]).some(
      (key) => String(rows[index][key] ?? "") !== String(base[key] ?? ""),
    );
  };

  // 変更のある行のindex一覧
  const changedIndexes = rows.map((_, i) => i).filter((i) => isRowChanged(i));
  // 保存が完了したようデータを新しい基準にする
  const commitRows = (saved: RowData[]) => setBaseline(saved);

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

  const removeSuccessfulRows = (results: boolean[]) => {
    setRows((prev) => {
      const remaining = prev.filter((_, i) =>
        i < results.length ? !results[i] : true,
      );
      return remaining.length == 0
        ? [{ ...config.defaultValues } as RowData]
        : remaining;
    });
  };

  return {
    rows,
    isInputMode,
    ids,
    updateField,
    addRow,
    removeRow,
    isRowChanged,
    changedIndexes,
    commitRows,
    removeSuccessfulRows,
  };
}
