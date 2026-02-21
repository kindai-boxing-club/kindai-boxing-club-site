/** 管理画面用の定数 */

import { Grade, Position, PersonFormInput } from "@/types";

export const GRADES: Grade[] = [
  "1年",
  "2年",
  "3年",
  "4年",
  "院生",
  // "総監督",
  // "監督",
  // "コーチ",
  // "部長",
];

export const POSITIONS: Position[] = [
  "主将",
  "副将",
  "主務",
  "会計",
  // "総監督",
  // "監督",
  // "コーチ",
  // "部長",
];

export const WEIGHT_CLASSES = ["50", "55", "60", "65", "70", "75"] as const;

export const MEMBER_TABLE_COLUMNS = [
  "姓",
  "名",
  "学年",
  "役職",
  "学部",
  "階級",
  "マネ",
] as const;

// 新規メンバーのデフォルト値
export const DEFAULT_MEMBER_VALUES: PersonFormInput = {
  lastName: "",
  firstName: "",
  grade: "1年",
  position: null,
  is_manager: 0,
  faculty: "",
  weight_class: null,
};
