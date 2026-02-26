/** アプリケーション全体の型定義 */

/**
 * 学年・役職（表示時のグループ分けに使用）
 * 学生: 1年〜院生
 * 指導者: 総監督、監督、コーチ、部長
 */

export type MemberGrade = "1年" | "2年" | "3年" | "4年" | "院生";

export type StaffGrade = "総監督" | "監督" | "コーチ" | "部長";

export type Grade = MemberGrade | StaffGrade;

export type MemberPosition = "主将" | "副将" | "主務" | "会計";

export type StaffPosition = "総監督" | "監督" | "コーチ" | "部長";

export type Position = MemberPosition | StaffPosition;

export type GroupedPerson = {
  label: string;
  persons: Person[];
};

/**
 * 部員の型定義
 */
export interface Person {
  id: number; // 主キー
  name: string; // 名前
  grade: Grade; // 学年・役職 グループ分けに仕様
  position: Position | null; // 役職（staff: gradeと同じ値を格納）
  is_manager: 0 | 1 | null; // マネージャーかどうか(0: 選手, 1: マネージャー)(staff: null)
  faculty: string | null; // 学部(staff: null)
  weight_class: string | null; // 階級(staff: null)
  state: "active" | "deleted" | "graduated"; // 状態
  has_experience: boolean | null; // 経験の有無(staff: null)
}

/**
 * 新規メンバー追加用（IDなし）
 */
export type MemberInput = Omit<Person, "id" | "state">;

export type StaffInput = Omit<
  Person,
  | "id"
  | "position"
  | "is_manager"
  | "faculty"
  | "weight_class"
  | "state"
  | "has_experience"
>;

/**
 * フォーム入力用（姓名分離）
 * DBへの追加時に姓名を結合してnameフィールドに変換する
 */
export interface PersonFormInput {
  lastName: string; // 姓
  firstName: string; // 名
  grade: Grade;
  position: Position | null;
  is_manager: 0 | 1;
  faculty: string;
  weight_class: string | null;
}
