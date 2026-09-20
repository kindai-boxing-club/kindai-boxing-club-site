/**
 * Person(staff, member)のCRUDサーバーアクション
 */
"use server";

import * as personService from "@/lib/service/person.service";
import {
  MemberInput,
  MemberUpdate,
  StaffInput,
  StaffUpdate,
  addResult,
} from "@/types";
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
export async function addMembersAction(
  members: MemberInput[],
): Promise<addResult> {
  const results = await Promise.all(
    members.map(async (m) => {
      try {
        if (!m.name || !m.name.trim()) return false;
        return await personService.addMember(m);
      } catch {
        return false;
      }
    }),
  );

  const successCount = results.filter(Boolean).length;
  const failureCount = results.length - successCount;

  if (successCount > 0) {
    revalidatePath("/admin/members", "layout");
    revalidatePath("/");
  }
  return {
    successCount,
    failureCount,
    results,
  };
}

/**
 * Memberを更新する
 * @param id 更新対象MemberID
 * @param data 更新対象Memberデータ
 */
export async function updateMembersAction(
  updates: {
    id: number;
    data: MemberUpdate;
  }[],
): Promise<void> {
  await Promise.all(
    updates.map((u) => personService.updateMember(u.id, u.data)),
  );
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
export async function addStaffAction(staff: StaffInput[]): Promise<addResult> {
  const results = await Promise.all(
    staff.map(async (s) => {
      try {
        if (!s.name || !s.name.trim()) return false;
        return await personService.addStaff(s);
      } catch {
        return false;
      }
    }),
  );

  const successCount = results.filter(Boolean).length;
  const failureCount = results.length - successCount;

  if (successCount > 0) {
    revalidatePath("/admin/staff", "layout");
    revalidatePath("/");
  }
  return {
    successCount,
    failureCount,
    results,
  };
}

/**
 * Staffを更新する
 * @param id 更新対象StaffID
 * @param data 更新対象Staffデータ
 */
export async function updateStaffsAction(
  updates: {
    id: number;
    data: StaffUpdate;
  }[],
): Promise<void> {
  await Promise.all(
    updates.map((u) => personService.updateStaff(u.id, u.data)),
  );
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
