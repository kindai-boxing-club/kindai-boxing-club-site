/**
 * @file components/public/members/MemberSection.tsx
 * @description 部員紹介セクション（Server Component）
 *
 * 役割:
 * - D1 から部員データを取得
 * - 学年ごとにグループ化
 * - クライアントコンポーネント（MemberSectionClient）に渡す
 */

import { getMembers } from "@/lib/db/members";
import {
  TeamCollection,
  MEMBER_GRADE_ORDER,
} from "@/lib/domain/TeamCollection";
import MemberSectionClient from "./MemberSectionClient";

export default async function MemberSection() {
  // サーバーサイドでデータを取得
  const members = await getMembers();

  // 並び替え処理
  const collection = new TeamCollection(members).sortDefault();
  const membersByGrade = collection.groupByGrade();
  const memberGroupKeys = TeamCollection.getSortedGroupKeys(
    membersByGrade,
    MEMBER_GRADE_ORDER,
  );

  return (
    <MemberSectionClient
      groups={membersByGrade}
      groupKeys={memberGroupKeys}
      bgColor={"bg-gray-50"}
    />
  );
}
