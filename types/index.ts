/**
 * @file types/index.ts
 * @description アプリケーション全体で使用する型定義
 *
 * 主な型:
 * - Grade: 学年・役職（表示順のグループ分けに使用）
 * - Position: 役職（カードに表示するタグ）
 * - Person: 部員データの型
 * - PersonInput: 新規登録用（IDなし）
 */

/**
 * 学年・役職（表示時のグループ分けに使用）
 * 学生: 1年〜院生
 * 指導者: 総監督、監督、コーチ、部長
 */
export type Grade =
  | "1年"
  | "2年"
  | "3年"
  | "4年"
  | "院生"
  | "総監督"
  | "監督"
  | "コーチ"
  | "部長";

/**
 * 役職（カードに表示するタグ）
 * 学生: 主将、副将、主務、会計
 * 指導者: 総監督、監督、コーチ、部長
 */
export type Position =
  | "主将"
  | "副将"
  | "主務"
  | "会計"
  | "総監督"
  | "監督"
  | "コーチ"
  | "部長";

/**
 * 部員の型定義
 */
export interface Person {
  id: number; // 主キー
  name: string; // 名前
  grade: Grade; // 学年・役職（グループ分け用）
  position: Position | null; // 役職（学生のみ）
  is_manager: 0 | 1; // マネージャーかどうか（0: 選手, 1: マネージャー）
  faculty: string; // 学部
  weight_class: string | null; // 階級
}

/**
 * 新規メンバー追加用（IDなし）
 */
export type PersonInput = Omit<Person, "id">;
