/** エンティティ設定の型定義
 *
 * 型定義をして、member.config.ts, staff.config.tsで利用
 * PersonTable を構成するためのカラム・フィールド定義の型
 */

import { ReactNode } from "react";

/**フィールドの型*/
export type FieldType = "text" | "select" | "checkbox";

/**セレクトボックスの選択肢*/
export type SelectOption = {
  value: string;
  label: string;
};

/**フォーム入力の定義 */
export type FieldDef = {
  type: FieldType;
  options?: SelectOption[];
  placeholder?: string;
};

/**テーブルのカラム定義 */
export type ColumnDef<T> = {
  key: keyof T & string;
  label: string;
  field?: FieldDef;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

/**
 * エンティティ設定
 *
 * fieldなし→ 表示のみ
 * renderあり→ 表示と編集値の変換
 */
export type EntityConfig<T extends { id: number }> = {
  name: string;
  label: string;
  columns: ColumnDef<T>[];
  defaultValues: Omit<T, "id" | "state">;
};
