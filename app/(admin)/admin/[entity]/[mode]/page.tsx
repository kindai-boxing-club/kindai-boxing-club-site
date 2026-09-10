/** 管理画面の動的ルーティングページ */
import * as memberRepository from "@/lib/db/member.repository";
import * as staffRepository from "@/lib/db/staff.repository";
import {
  deleteMemberAction,
  addMembersAction,
  updateMembersAction,
  deleteStaffAction,
  addStaffAction,
  updateStaffsAction,
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
    const data =
      mode === "add"
        ? []
        : mode === "delete"
          ? await memberRepository.getAllActive()
          : await memberRepository.getAll();
    return (
      <AdminEntityView
        entity="members"
        data={data}
        mode={mode as Mode}
        onDelete={deleteMemberAction}
        onSubmit={addMembersAction}
        onUpdate={updateMembersAction}
      />
    );
  }

  if (entity === "staff") {
    const data =
      mode === "add"
        ? []
        : mode === "delete"
          ? await staffRepository.getAllActive()
          : await staffRepository.getAll();
    return (
      <AdminEntityView
        entity="staff"
        data={data}
        mode={mode as Mode}
        onDelete={deleteStaffAction}
        onSubmit={addStaffAction}
        onUpdate={updateStaffsAction}
      />
    );
  }

  return notFound();
}