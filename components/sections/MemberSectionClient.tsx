/**
 * 部員セクションコンポーネント
 * グループ化された部員情報をセクションごとに表示する。
 * 分類ごとのヘッダーとグリッド表示を管理する。
 */
/**
 * 部員紹介セクション（クライアントコンポーネント）
 */
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { Person   } from "@/types";
import Grid from "../team/Grid";
import TeamMemberModal from "../team/TeamMemberModal";
import SectionHeading from "../ui/SectionHeading";
import CategoryHeading from "../ui/CategoryHeading";



type Props = {
  groups: Record<string, Person[]>;
  groupKeys: string[];

  bgColor?: string;
};

export default function MemberSectionClient({
  groups,
  groupKeys,

  bgColor = "bg-gray-50",
}: Props) {
  const [selectedMember, setSelectedMember] = useState<Person | null>(null);


  return (
    <section className={`py-24 px-4 ${bgColor} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* セクションヘッダー */}
        <SectionHeading title="MEMBERS" subtitle="ともにトレーニングに励む仲間たち" bg="light" />


        {groupKeys.map((classification) => {
          const members = groups[classification];
          const isSpecialRole = ["部長", "総監督", "監督"].includes(classification);

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
