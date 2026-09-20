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
import PhotoManager from "@/components/admin/PhotoManager";

const VALID_MODES = ["view", "delete", "add", "edit", "photo"] as const;
type Mode = (typeof VALID_MODES)[number];
type TableMode = Exclude<Mode, "photo">;

export default async function AdminEntityPage({
  params,
}: {
  params: Promise<{ entity: string; mode: string }>;
}) {
  const { entity, mode } = await params;

  if (!VALID_MODES.includes(mode as Mode)) return notFound();

  if (entity === "members") {
    if (mode === "photo") {
      const data = await memberRepository.getAllActive();
      return <PhotoManager entity="members" data={data} />;
    }

    const data =
      mode === "add"
        ? []
        : mode === "delete"
          ? await memberRepository.getAllActive()
          : await memberRepository.getAll();
    return (
      <div>
        {mode === "add" && (
          <div>
            <p>名字と名前の間に半角空白を入れるように</p>
            <br />
          </div>
        )}
        <AdminEntityView
          entity="members"
          data={data}
          mode={mode as TableMode}
          onDelete={deleteMemberAction}
          onSubmit={addMembersAction}
          onUpdate={updateMembersAction}
        />
      </div>
    );
  }

  if (entity === "staff") {
    if (mode === "photo") {
      const data = await staffRepository.getAllActive();
      return <PhotoManager entity="staff" data={data} />;
    }
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
        mode={mode as TableMode}
        onDelete={deleteStaffAction}
        onSubmit={addStaffAction}
        onUpdate={updateStaffsAction}
      />
    );
  }

  return notFound();
}
