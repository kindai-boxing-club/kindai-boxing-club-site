/** 部員紹介セクション（Server Component） */

import MemberSectionClient from "./MemberSectionClient";
import type { GroupedPerson } from "@/types";

export default function MemberSection({
  groupedMembers,
}: {
  groupedMembers: GroupedPerson[];
}) {
  return (
    <MemberSectionClient
      groupedPerson={groupedMembers}
      bgColor={"bg-gray-50"}
    />
  );
}
