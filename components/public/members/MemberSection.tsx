import { getMembers } from "@/lib/data/dbMembers";
import {
  MemberCollection,
  MEMBER_GRADE_ORDER,
} from "@/lib/domain/MemberCollection";
import MemberSectionClient from "./MemberSectionClient";

export default async function MemberSection() {
  // サーバーサイドでデータを取得
  const members = await getMembers();

  // 並び替え処理
  const collection = new MemberCollection(members).sortDefault();
  const membersByGrade = collection.groupByGrade();
  const memberGroupKeys = MemberCollection.getSortedGroupKeys(
    membersByGrade,
    MEMBER_GRADE_ORDER
  );

  return (
    <MemberSectionClient
      groups={membersByGrade}
      groupKeys={memberGroupKeys}
      bgColor={"bg-gray-50"}
    />
  );
}
