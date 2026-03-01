/** 管理画面用の定数 */

export const MEMBER_GRADES = ["1年", "2年", "3年", "4年", "院生"] as const;
export const STAFF_GRADES = ["総監督", "監督", "コーチ", "部長"] as const;
export const MEMBER_POSITIONS = ["主将", "副将", "主務", "会計", null] as const;
export const STAFF_POSITIONS = [...STAFF_GRADES] as const;
export const STATES = ["active", "deleted", "graduated"] as const;

export const WEIGHT_CLASSES = ["50", "55", "60", "65", "70", "75"] as const;
export const FACULTIES = [
  "情報学部",
  "経済学部",
  "経営学部",
  "法学部",
  "理工学部",
  "建築学部",
  "薬学部",
  "文芸学部",
  "総合社会学部",
  "国際学部",
  "生物理工学部",
  "工学部",
  "農学部",
  "医学部",
  "産業理工学部",
  "看護学部",
  "短期大学部",
  null,
] as const;
