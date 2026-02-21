/**
 * @file components/public/members/MemberSection.tsx
 * @description 部員紹介セクション（Server Component）
 *
 * 役割:
 * - D1 から部員データを取得
 * - 学年ごとにグループ化
 * - クライアントコンポーネント（MemberSectionClient）に渡す
 */

import MemberSectionClient from "./MemberSectionClient";
import { getGroupedMembers } from "@/lib/service/person.service";

export default async function MemberSection() {
  const groupedPerson = await getGroupedMembers();

  return (
    <MemberSectionClient groupedPerson={groupedPerson} bgColor={"bg-gray-50"} />
  );
}
