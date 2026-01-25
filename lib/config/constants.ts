/**
 * @file lib/config/constants.ts
 * @description アプリケーション全体で使用する定数を集約
 *
 * このファイルの役割:
 * - 部員・スタッフの分類順序を定義
 * - 表示名のマッピングを定義
 */

/**
 * 部員の分類順序
 */
export const memberClassificationOrder = [
  "マネージャー",
  "4年",
  "3年",
  "2年",
  "1年",
];

/**
 * スタッフの分類順序
 */
export const staffClassificationOrder = ["部長", "総監督", "監督", "コーチ"];

/**
 * 部員の分類表示名
 */
export const memberClassificationDisplay: Record<string, string> = {
  マネージャー: "マネージャー",
  "4年": "4年",
  "3年": "3年",
  "2年": "2年",
  "1年": "1年",
};

/**
 * スタッフの分類表示名
 */
export const staffClassificationDisplay: Record<string, string> = {
  部長: "部長",
  総監督: "総監督",
  監督: "監督",
  コーチ: "コーチ",
};
