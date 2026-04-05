/** 状態変更ページ */

import * as memberRepository from "@/lib/db/member.repository";
import { changeStateAction } from "@/lib/actions/person.action";
import StateChangeTable from "@/components/admin/StateChangeTable";

export default async function StateChangePage() {
  const members = await memberRepository.getAll();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">状態変更</h1>
      <StateChangeTable members={members} onChangeState={changeStateAction} />
    </div>
  );
}
