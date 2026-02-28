/** 部員紹介セクション */
"use client";

import type { GroupedMember } from "@/types";
import Grid from "./Grid";
import SectionHeading from "@/components/public/ui/SectionHeading";
import CategoryHeading from "@/components/public/ui/CategoryHeading";

export default function MemberSection({
  groupedMembers,
}: {
  groupedMembers: GroupedMember[];
}) {
  return (
    <section
      id="members"
      className={`py-24 px-4 bg-gray-50 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* セクションヘッダー */}
        <SectionHeading
          title="MEMBERS"
          subtitle="ともにトレーニングに励む仲間たち"
        />
        <div className="container mx-auto px-4">
          {groupedMembers.map((group) => {
            const persons = group.persons;
            if (!persons || persons.length === 0) return null;
            return (
              <div key={group.label} className="mb-24">
                <CategoryHeading title={group.label} />
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
