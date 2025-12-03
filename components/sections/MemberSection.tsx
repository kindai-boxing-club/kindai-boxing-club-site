/**
 * 部員紹介セクション（サーバーコンポーネント）
 */
import { fetchMembers } from "@/lib/data/fetchMembers";
import {
  groupByClassification,
  orderKeys,
  memberClassificationOrder,

} from "@/lib/data/grouping";
import MemberSectionClient from "./MemberSectionClient";



export default async function MemberSection() {
  const members = await fetchMembers();
  const membersByClassification = groupByClassification(members);
  const memberGroupKeys = orderKeys(
    membersByClassification,
    memberClassificationOrder
  );

  return (
    <MemberSectionClient
      groups={membersByClassification}
      groupKeys={memberGroupKeys}
      bgColor={"bg-gray-50"}
    />
  );
}
