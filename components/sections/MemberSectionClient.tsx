/**
 * 部員セクションコンポーネント
 * グループ化された部員情報をセクションごとに表示する。
 * 分類ごとのヘッダーとグリッド表示を管理する。
 */
/**
 * 部員紹介セクション（クライアントコンポーネント）
 */
"use client";

import type { Person } from "@/types";
import Grid from "../person/Grid";
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
            const members = groups[grade];
            if (!members || members.length === 0) return null;
            return (
              <div key={grade} className="mb-24">
                <CategoryHeading title={grade} />
                <div className="mt-8">
                  <Grid members={members} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
