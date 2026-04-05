/** 一斉進級ページ */

import * as memberRepository from "@/lib/db/member.repository";
import { promoteMembersAction } from "@/lib/actions/person.action";
import PromotionTable from "@/components/admin/PromotionTable";

export default async function PromotionPage() {
  const members = await memberRepository.getAllActive();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">一斉進級</h1>
      <PromotionTable members={members} onPromote={promoteMembersAction} />
    </div>
  );
}
