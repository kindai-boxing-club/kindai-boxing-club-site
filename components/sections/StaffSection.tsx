/**
 * スタッフ紹介セクション
 * グループ化されたスタッフ情報をセクションごとに表示する。
 */
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Person } from "@/types";
import Grid from "../person/Grid";
import TeamMemberModal from "../person/TeamMemberModal";
import SectionHeading from "../ui/SectionHeading";
import { COACHES_DATA } from "@/public/person/coaches";
import { EXECUTIVES_DATA } from "@/lib/data/executives";
import {
  groupByClassification,
  orderKeys,
  staffClassificationOrder,
} from "@/lib/data/grouping";
import CategoryHeading from "../ui/CategoryHeading";
import KiyotakiFumi from "../person/KiyotakiFumi";

type Props = {
  bgColor?: string;
  sectionId?: string;
};

export default function StaffSection({
  bgColor = "bg-gray-50",
  sectionId,
}: Props) {
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);

  const staff = [...EXECUTIVES_DATA, ...COACHES_DATA];
  const groups = groupByClassification(staff);
  const groupKeys = orderKeys(groups, staffClassificationOrder);

  return (
    <section
      id={sectionId}
      className={`py-24 px-4 ${bgColor} relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="STAFF"
          subtitle="チームを支えるスタッフ"
          bg="light"
        />

        {groupKeys.map((classification) => {
          const members = groups[classification];
          const isSpecialRole = ["部長", "総監督", "監督"].includes(
            classification
          );

          return (
            <div key={classification} className="mb-24">
              <CategoryHeading title={classification} />

              <Grid
                members={members}
                isSpecialRole={isSpecialRole}
                onMemberClick={setSelectedMember}
              />
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
