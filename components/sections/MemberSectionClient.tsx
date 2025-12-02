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
import type { Member } from "@/types";
import MemberGrid from "../members/MemberGrid";
import MemberModal from "../members/MemberModal";
import SectionHeading from "../ui/SectionHeading";



type Props = {
  groups: Record<string, Member[]>;
  groupKeys: string[];
  displayNames: Record<string, string>;
  bgColor?: string;
  sectionId?: string;
};

export default function MemberSectionClient({
  groups,
  groupKeys,
  displayNames,
  bgColor = "bg-gray-50",
  sectionId,
}: Props) {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);


  return (
    <section id={sectionId} className={`py-24 px-4 ${bgColor} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* セクションヘッダー */}
        <SectionHeading title="MEMBERS" subtitle="ともにトレーニングに励む仲間たち" bg="light" />


        {groupKeys.map((classification) => {
          const members = groups[classification];
          const isSpecialRole = ["部長", "総監督", "監督"].includes(classification);

          return (
            <div key={classification} className="mb-24">
              <div className="max-w-5xl mx-auto mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-12 bg-red-600 transform -skew-x-12" />
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                    {displayNames[classification] ?? classification}
                  </h3>
                </div>
              </div>
              
              <MemberGrid
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
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
