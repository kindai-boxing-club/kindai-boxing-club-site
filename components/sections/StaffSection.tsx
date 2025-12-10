/**
 * スタッフ紹介セクション
 * グループ化されたスタッフ情報をセクションごとに表示する。
 */
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Person } from "@/types";
import { groupByGrade, orderKeys, staffGradeOrder } from "@/lib/data/grouping";
import CategoryHeading from "@/components/ui/CategoryHeading";
import Grid from "@/components/person/Grid";
import TeamMemberModal from "@/components/person/TeamMemberModal";
import KiyotakiFumi from "@/components/person/KiyotakiFumi";
import AkaiHidekazu from "@/components/person/AkaiHidekazu";
import NashiroNobuo from "@/components/person/NashiroNobuo";
import { COACHES_DATA } from "@/public/person/coaches";
import SectionHeading from "../ui/SectionHeading";

export default function StaffSection({
  coaches = COACHES_DATA, // デフォルトで静的データを使用
}: {
  coaches?: Person[];
}) {
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);

  // コーチデータのみをグルーピング
  const allStaff = [...coaches];
  const groups = groupByGrade(allStaff);
  const groupKeys = orderKeys(groups, staffGradeOrder);

  return (
    <section id="staff" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="STAFF" subtitle="チームを支えるスタッフ" />

        {/* 役員（静的配置） */}
        <div className="mb-24">
          <div className="flex flex-col gap-24 max-w-4xl mx-auto">
            <CategoryHeading title="部長" />
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              <KiyotakiFumi />
            </div>
            <CategoryHeading title="総監督" />
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              <AkaiHidekazu />
            </div>
            <CategoryHeading title="監督" />
            <div className="flex flex-col gap-8 max-w-4xl mx-auto">
              <NashiroNobuo />
            </div>
          </div>
        </div>

        {/* コーチ（動的配置） */}
        {groupKeys.map((grade) => {
          const coaches = groups[grade];
          if (!coaches || coaches.length === 0) return null;

          return (
            <div key={grade} className="mb-24">
              <CategoryHeading title={grade} />
              <div className="mt-8 ">
                <Grid members={coaches} onMemberClick={setSelectedMember} />
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
