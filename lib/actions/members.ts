"use server";
import { deleteMember } from "@/lib/db/members";
import { revalidatePath } from "next/cache";

/**
 * メンバーを削除する Server Action
 * @param id - 削除するメンバーのID
 */
export async function deleteMemberAction(id: number): Promise<void> {
  await deleteMember(id);
  revalidatePath("/admin/members");
}
