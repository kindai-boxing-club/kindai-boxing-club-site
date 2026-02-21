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
import { getMembersByGrade } from "@/lib/service/person.service";

export default async function MemberSection() {
  const { groups, groupKeys } = await getMembersByGrade();

  return (
    <MemberSectionClient
      groups={groups}
      groupKeys={groupKeys}
      bgColor={"bg-gray-50"}
    />
  );
}
