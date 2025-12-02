/**
 * 部員紹介セクション（サーバーコンポーネント）
 */
import { fetchMembers } from "@/lib/data/fetchMembers";
import {
  groupByClassification,
  orderKeys,
  memberClassificationOrder,
  memberClassificationDisplay,
} from "@/lib/data/grouping";
import MemberSectionClient from "./MemberSectionClient";

type Props = {
  sectionId?: string;
};

export default async function MemberSection({
  sectionId,
}: Props) {
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
      displayNames={memberClassificationDisplay}
      bgColor={"bg-gray-50"}
      sectionId={sectionId}
    />
  );
}
