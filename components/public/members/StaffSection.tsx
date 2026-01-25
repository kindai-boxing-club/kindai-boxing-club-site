/**
 * @file components/public/members/StaffSection.tsx
 * @description スタッフ（指導者）紹介セクション
 */
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Person } from "@/types";
import {
  MemberCollection,
  STAFF_GRADE_ORDER,
} from "@/lib/domain/MemberCollection";
import CategoryHeading from "@/components/public/ui/CategoryHeading";
import Grid from "@/components/public/members/Grid";
import TeamMemberModal from "@/components/public/members/TeamMemberModal";
import KiyotakiFumi from "@/components/public/members/KiyotakiFumi";
import AkaiHidekazu from "@/components/public/members/AkaiHidekazu";
import NashiroNobuo from "@/components/public/members/NashiroNobuo";
import { COACHES_DATA } from "@/public/person/coaches";
import SectionHeading from "@/components/public/ui/SectionHeading";

export default function StaffSection({
  coaches = COACHES_DATA, // デフォルトで静的データを使用
}: {
  coaches?: Person[];
}) {
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);

  // コーチデータのみをグルーピング
  const collection = new MemberCollection(coaches);
  const groups = collection.groupByGrade();
  const groupKeys = MemberCollection.getSortedGroupKeys(
    groups,
    STAFF_GRADE_ORDER,
  );

  return (
    <section id="staff" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="STAFF" subtitle="チームを支えるスタッフ" />

        {/* 役員（静的配置） */}
        <div className="mb-24">
          {/* 部長 */}
          <div className="mb-24">
            <CategoryHeading title="部長" />
            <div className="mt-8 flex flex-col gap-8 max-w-4xl mx-auto">
              <KiyotakiFumi />
            </div>
          </div>

          {/* 総監督 */}
          <div className="mb-24">
            <CategoryHeading title="総監督" />
            <div className="mt-8 flex flex-col gap-8 max-w-4xl mx-auto">
              <AkaiHidekazu />
            </div>
          </div>

          {/* 監督 */}
          <div className="mb-24">
            <CategoryHeading title="監督" />
            <div className="mt-8 flex flex-col gap-8 max-w-4xl mx-auto">
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
                <Grid members={coaches} />
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
