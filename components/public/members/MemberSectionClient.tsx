/** 部員紹介セクション（Client Component） */
"use client";

import type { GroupedPerson } from "@/types";
import Grid from "./Grid";
import SectionHeading from "@/components/public/ui/SectionHeading";
import CategoryHeading from "@/components/public/ui/CategoryHeading";

type Props = {
  groupedPerson: GroupedPerson[];
  bgColor?: string;
};

export default function MemberSectionClient({
  groupedPerson,
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
          {groupedPerson.map((group) => {
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
