"use server";

import { deleteMember, createMember } from "@/lib/db/members";
import { revalidatePath } from "next/cache";
import { PersonInput } from "@/types";

/**
 * メンバーを削除する Server Action
 * @param id - 削除するメンバーのID
 */
export async function deleteMemberAction(id: number): Promise<void> {
  await deleteMember(id);
  revalidatePath("/admin/members");
}

/**
 * メンバーを一括追加する Server Action
 * @param members - 追加するメンバーのデータの配列
 */
export async function addMembersAction(members: PersonInput[]): Promise<void> {
  // 順序維持やエラーハンドリングを考えてPromise.allで実行
  await Promise.all(members.map((member) => createMember(member)));

  revalidatePath("/admin/members");
}
