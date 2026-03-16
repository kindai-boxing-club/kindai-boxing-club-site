/** personに関するビジネスロジック */

import * as memberRepository from "@/lib/db/member.repository";
import * as staffRepository from "@/lib/db/staff.repository";
import { MOCK_MEMBERS, MOCK_STAFF } from "@/lib/db/person.mock";

import {
  MemberInput,
  GroupedMember,
  Member,
  Staff,
  GroupedStaff,
  StaffInput,
  MemberGrade,
  StaffGrade,
} from "@/types";

const MEMBER_GRADE_ORDER = ["マネージャー", "4年", "3年", "2年", "1年", "院生"];

const STAFF_GRADE_ORDER = ["部長", "総監督", "監督", "コーチ"];

/**
 * 全メンバーを取得 (役職順、学年順、ID順)
 *
 * @returns 全メンバーのデータ
 */
export async function getMembers(): Promise<Member[]> {
  let members = await memberRepository.getAllActive();
  if (members.length === 0) members = MOCK_MEMBERS;
  return members;
}

/**
 * 全スタッフを取得 (役職順、学年順、ID順)
 *
 * @returns 全スタッフのデータ
 */
export async function getStaff(): Promise<Staff[]> {
  let staff = await staffRepository.getAllActive();
  if (staff.length === 0) staff = MOCK_STAFF;
  return staff;
}

/**
 * メンバーをグループ化する
 *
 * @param members - メンバーのデータ
 * @returns グループ化されたメンバーのデータ
 */
export function groupMembers(members: Member[]): GroupedMember[] {
  // gradeでグルーピング
  const groupMap: Record<string, Member[]> = {};
  for (const person of members) {
    const key = person.is_manager === 1 ? "マネージャー" : person.grade.trim();
    if (!groupMap[key]) groupMap[key] = [];
    groupMap[key].push(person);
  }
  // 空のグループを除外したORDERの順序に従って再度配列を作成
  return MEMBER_GRADE_ORDER.filter((key) => groupMap[key]?.length).map(
    (key) => ({ label: key as MemberGrade, persons: groupMap[key] }),
  );
}

/**
 * スタッフをグループ化する
 *
 * @param staff - スタッフのデータ
 * @returns グループ化されたスタッフのデータ
 */
export function groupStaff(staff: Staff[]): GroupedStaff[] {
  const groupMap: Record<string, Staff[]> = {};
  for (const person of staff) {
    const key = person.grade.trim();
    if (!groupMap[key]) groupMap[key] = [];
    groupMap[key].push(person);
  }
  // keyを並び替える
  return STAFF_GRADE_ORDER.filter((key) => groupMap[key]?.length).map(
    (key) => ({ label: key as StaffGrade, persons: groupMap[key] }),
  );
}

/**
 * 学年順の全メンバーをグループ化して取得
 *
 * @returns 学年順の全メンバーのデータ
 */
export async function getGroupedMembers(): Promise<GroupedMember[]> {
  const members = await getMembers();
  return groupMembers(members);
}

/**
 * 学年順の全スタッフをグループ化して取得
 *
 * @returns 学年順の全スタッフのデータ
 */
export async function getGroupedStaff(): Promise<GroupedStaff[]> {
  const staff = await getStaff();
  return groupStaff(staff);
}

/**
 * メンバーを追加
 *
 * @param data - 追加するメンバーのデータ
 * @returns 追加に成功したかどうか
 */
export async function addMember(data: MemberInput): Promise<boolean> {
  return memberRepository.create(data);
}

/**
 * スタッフを追加
 *
 * @param data - 追加するスタッフのデータ
 * @returns 追加に成功したかどうか
 */
export async function addStaff(data: StaffInput): Promise<boolean> {
  return staffRepository.create(data);
}

/**
 * メンバーを削除
 *
 * @param id - 削除するメンバーのID
 * @returns 削除に成功したかどうか
 */
export async function deleteMember(id: number): Promise<boolean> {
  return memberRepository.remove(id);
}

/**
 * スタッフを削除
 *
 * @param id - 削除するスタッフのID
 * @returns 削除に成功したかどうか
 */
export async function deleteStaff(id: number): Promise<boolean> {
  return staffRepository.remove(id);
}

/**
 * メンバー情報を更新
 *
 * @param id - 更新対象のメンバーID
 * @param data - 更新するデータ
 * @returns 更新に成功したかどうか
 */
export async function updateMember(
  id: number,
  data: MemberInput,
): Promise<boolean> {
  return memberRepository.update(id, data);
}

/**
 * スタッフ情報を更新
 *
 * @param id - 更新対象のスタッフID
 * @param data - 更新するデータ
 * @returns 更新に成功したかどうか
 */
export async function updateStaff(
  id: number,
  data: StaffInput,
): Promise<boolean> {
  return staffRepository.update(id, data);
}
