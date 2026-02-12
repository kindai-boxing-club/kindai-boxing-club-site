/**
 * @file components/public/members/MemberSectionClient.tsx
 * @description 部員紹介セクション（Client Component）
 *
 * 役割:
 * - サーバーから受け取ったデータを表示
 * - 学年ごとにグループ化された部員をグリッド表示
 */
"use client";

import type { Person } from "@/types";
import Grid from "./Grid";
import SectionHeading from "@/components/public/ui/SectionHeading";
import CategoryHeading from "@/components/public/ui/CategoryHeading";

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
  return (
    <section
      id="members"
      className={`py-24 px-4 ${bgColor} relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* セクションヘッダー */}
        <SectionHeading
          title="MEMBERS"
          subtitle="ともにトレーニングに励む仲間たち"
        />
        <div className="container mx-auto px-4">
          {groupKeys.map((grade) => {
            const persons = groups[grade];
            if (!persons || persons.length === 0) return null;
            return (
              <div key={grade} className="mb-24">
                <CategoryHeading title={grade} />
                <div className="mt-8">
                  <Grid persons={persons} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
