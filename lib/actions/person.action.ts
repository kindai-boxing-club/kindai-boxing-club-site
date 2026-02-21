"use server";

import * as personService from "@/lib/service/person.service";
import { PersonInput } from "@/types";
import { revalidatePath } from "next/cache";

export async function deleteMemberAction(id: number): Promise<void> {
  await personService.deleteMember(id);
  revalidatePath("/admin/members");
}

export async function addMembersAction(members: PersonInput[]): Promise<void> {
  await Promise.all(members.map((m) => personService.addMember(m)));
  revalidatePath("/admin/members");
}
