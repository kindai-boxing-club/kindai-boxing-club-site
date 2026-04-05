"use client";

import { memberConfig } from "@/lib/admin/member.config";
import { staffConfig } from "@/lib/admin/staff.config";
import PersonTable from "./PersonTable";
import { Member, Staff, MemberInput, StaffInput } from "@/types";

type Mode = "view" | "delete" | "edit" | "add";

type Props = {
  entity: "members" | "staff";
  data: (Member | Staff)[];
  mode: Mode;
  onDelete?: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: ((rows: MemberInput[]) => void) | ((rows: StaffInput[]) => void) | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate?: ((id: number, updates: MemberInput) => void) | ((id: number, updates: StaffInput) => void) | any;
};

/**
 * Server Component から Client Component(PersonTable) へ
 * 関数（config内のrender等）を渡すとエラーになるため、
 * ここ（Client Component）で config をインポートして PersonTable に渡すラッパー。
 */
export default function AdminEntityView({
  entity,
  data,
  mode,
  onDelete,
  onSubmit,
  onUpdate,
}: Props) {
  if (entity === "members") {
    return (
      <PersonTable<Member>
        config={memberConfig}
        data={data as Member[]}
        mode={mode}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
      />
    );
  }

  if (entity === "staff") {
    return (
      <PersonTable<Staff>
        config={staffConfig}
        data={data as Staff[]}
        mode={mode}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onUpdate={onUpdate}
      />
    );
  }

  return null;
}
