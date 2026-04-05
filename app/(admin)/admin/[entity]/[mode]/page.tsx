/** 管理画面の動的ルーティングページ */
import * as memberRepository from "@/lib/db/member.repository";
import * as staffRepository from "@/lib/db/staff.repository";
import {
  deleteMemberAction,
  addMembersAction,
  updateMemberAction,
  deleteStaffAction,
  addStaffAction,
  updateStaffAction,
} from "@/lib/actions/person.action";
import { notFound } from "next/navigation";
import AdminEntityView from "@/components/admin/AdminEntityView";

const VALID_MODES = ["view", "delete", "add", "edit"] as const;
type Mode = (typeof VALID_MODES)[number];

export default async function AdminEntityPage({
  params,
}: {
  params: Promise<{ entity: string; mode: string }>;
}) {
  const { entity, mode } = await params;

  if (!VALID_MODES.includes(mode as Mode)) return notFound();

  if (entity === "members") {
    const data = mode === "add" ? [] : await memberRepository.getAllActive();
    return (
      <AdminEntityView
        entity="members"
        data={data}
        mode={mode as Mode}
        onDelete={deleteMemberAction}
        onSubmit={addMembersAction}
        onUpdate={updateMemberAction}
      />
    );
  }

  if (entity === "staff") {
    const data = mode === "add" ? [] : await staffRepository.getAllActive();
    return (
      <AdminEntityView
        entity="staff"
        data={data}
        mode={mode as Mode}
        onDelete={deleteStaffAction}
        onSubmit={addStaffAction}
        onUpdate={updateStaffAction}
      />
    );
  }

  return notFound();
}

