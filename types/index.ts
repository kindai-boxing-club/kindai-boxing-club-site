/** アプリケーション全体の型定義 */

import {
  MEMBER_GRADES,
  STAFF_GRADES,
  MEMBER_POSITIONS,
  STAFF_POSITIONS,
  STATES,
  WEIGHT_CLASSES,
  FACULTIES,
} from "@/lib/constants";

// 学年・役職 (グループ分けに使用)
export type Grade = MemberGrade | StaffGrade;
export type MemberGrade = (typeof MEMBER_GRADES)[number];
export type StaffGrade = (typeof STAFF_GRADES)[number];

// 役職 (ラベル)
export type Position = MemberPosition | StaffPosition;
export type MemberPosition = (typeof MEMBER_POSITIONS)[number] | null;
export type StaffPosition = (typeof STAFF_POSITIONS)[number];

// 状態 active: 在籍, deleted: 退部, graduated: 卒業
export type State = (typeof STATES)[number];

export type WeightClass = (typeof WEIGHT_CLASSES)[number];
export type Faculty = (typeof FACULTIES)[number];

/**
 * 部員・スタッフの共通基底型
 */
export interface Person {
  id: number;
  name: string;
  grade: Grade;
  position: Position;
  state: State;
}

/**
 * 部員の型定義
 */
export interface Member extends Person {
  grade: MemberGrade;
  position: MemberPosition;

  is_manager: 0 | 1;
  faculty: Faculty | null;
  weight_class: WeightClass | null;
  has_experience: boolean | null;
}

/**
 * スタッフの型定義
 */
export interface Staff extends Person {
  grade: StaffGrade;
  position: StaffPosition;

  bio: string | null;
}

/**
 * グループ分け用
 */
export type GroupedMember = {
  label: MemberGrade | "マネージャー";
  persons: Member[];
};

/**
 * グループ分け用
 */
export type GroupedStaff = {
  label: StaffGrade;
  persons: Staff[];
};

/**
 * 新規メンバー追加用（IDなし）
 */
export type MemberInput = Omit<Member, "id" | "state">;

/**
 * 新規スタッフ追加用（IDなし）
 */
export type StaffInput = Omit<Staff, "id" | "state">;

export type Table = "members" | "staff";
