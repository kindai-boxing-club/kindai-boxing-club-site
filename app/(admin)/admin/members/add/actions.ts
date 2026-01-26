/**
 * @file app/(admin)/admin/members/add/actions.ts
 * @description メンバー追加アクション
 */
"use server";

import { createMember } from "@/lib/db/members";
import type { Grade, PersonInput, Position } from "@/types";

export async function addMember(formData: FormData) {
  const data: PersonInput = {
    name: formData.get("name") as string,
    grade: formData.get("grade") as Grade,
    position: formData.get("position") as Position,
    faculty: formData.get("faculty") as string,
    is_manager: formData.get("is_manager") ? 1 : 0,
    weight_class: formData.get("weight_class") as string,
  };

  await createMember(data);
}
