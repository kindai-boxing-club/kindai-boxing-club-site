/** 管理画面用の定数 */

export const MEMBER_GRADES = ["1年", "2年", "3年", "4年", "院生"] as const;
export const STAFF_GRADES = ["総監督", "監督", "コーチ", "部長"] as const;
export const MEMBER_POSITIONS = ["主将", "副将", "主務", "会計"] as const;
export const STAFF_POSITIONS = STAFF_GRADES;
export const STATES = ["active", "deleted", "graduated"] as const;

export const WEIGHT_CLASSES = ["50", "55", "60", "65", "70", "75"] as const;
