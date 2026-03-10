/** スタッフ（指導者）紹介セクション */
"use client";

import CategoryHeading from "@/components/public/ui/CategoryHeading";
import Grid from "@/components/public/members/Grid";
import KiyotakiFumi from "@/components/public/members/KiyotakiFumi";
import AkaiHidekazu from "@/components/public/members/AkaiHidekazu";
import NashiroNobuo from "@/components/public/members/NashiroNobuo";
import SectionHeading from "@/components/public/ui/SectionHeading";
import { GroupedStaff } from "@/types";

export default function StaffSection({
  groupedStaff,
}: {
  groupedStaff: GroupedStaff[];
}) {
  return (
    <section id="staff" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="STAFF" subtitle="チームを支えるスタッフ" />

        <div className="container mx-auto px-4">
          {groupedStaff.map((group) => {
            const persons = group.persons;
            if (!persons || persons.length === 0) return null;
            return (
              <div key={group.label} className="mb-24">
                <CategoryHeading title={group.label} />
                <div className="mt-8">
                  {group.label === "部長" && (
                    <KiyotakiFumi person={persons[0]} />
                  )}
                  {group.label === "総監督" && (
                    <AkaiHidekazu person={persons[0]} />
                  )}
                  {group.label === "監督" && (
                    <NashiroNobuo person={persons[0]} />
                  )}
                  {group.label === "コーチ" && <Grid persons={persons} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
