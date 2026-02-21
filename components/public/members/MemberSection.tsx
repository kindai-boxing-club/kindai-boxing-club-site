/** 部員紹介セクション（Server Component） */

import MemberSectionClient from "./MemberSectionClient";
import { getGroupedMembers } from "@/lib/service/person.service";

export default async function MemberSection() {
  const groupedPerson = await getGroupedMembers();

  return (
    <MemberSectionClient groupedPerson={groupedPerson} bgColor={"bg-gray-50"} />
  );
}
