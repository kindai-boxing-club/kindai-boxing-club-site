/**
 * Person(staff, member)のCRUDサーバーアクション
 */
"use server";

import * as personService from "@/lib/service/person.service";
import { MemberInput, StaffInput } from "@/types";
import { revalidatePath } from "next/cache";

/**
 * Memberを削除する
 * @param id 削除対象MemberID
 */
export async function deleteMemberAction(id: number): Promise<void> {
  await personService.deleteMember(id);
  revalidatePath("/admin/members");
}

/**
 * Memberを複数追加する
 * @param members 追加対象Member配列
 */
export async function addMembersAction(members: MemberInput[]): Promise<void> {
  await Promise.all(members.map((m) => personService.addMember(m)));
  revalidatePath("/admin/members");
}

/**
 * Memberを更新する
 * @param id 更新対象MemberID
 * @param data 更新対象Memberデータ
 */
export async function updateMemberAction(
  id: number,
  data: MemberInput,
): Promise<void> {
  await personService.updateMember(id, data);
  revalidatePath("/admin/members");
}

/**
 * Staffを削除する
 * @param id 削除対象StaffID
 */
export async function deleteStaffAction(id: number): Promise<void> {
  await personService.deleteStaff(id);
  revalidatePath("/admin/staff");
}

/**
 * Staffを複数追加する
 * @param staff 追加対象Staff配列
 */
export async function addStaffAction(staff: StaffInput[]): Promise<void> {
  await Promise.all(staff.map((s) => personService.addStaff(s)));
  revalidatePath("/admin/staff");
}

/**
 * Staffを更新する
 * @param id 更新対象StaffID
 * @param data 更新対象Staffデータ
 */
export async function updateStaffAction(
  id: number,
  data: StaffInput,
): Promise<void> {
  await personService.updateStaff(id, data);
  revalidatePath("/admin/staff");
}

/**
 * 選択されたメンバーの学年を一斉に1つ進める
 * @param ids 進級対象のメンバーIDリスト
 */
export async function promoteMembersAction(ids: number[]): Promise<void> {
  await personService.promoteMembers(ids);
  revalidatePath("/admin/members");
}
