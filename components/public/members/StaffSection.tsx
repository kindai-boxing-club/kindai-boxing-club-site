/** スタッフ（指導者）紹介セクション */
"use client";

import CategoryHeading from "@/components/public/ui/CategoryHeading";
import Grid from "@/components/public/members/Grid";
import KiyotakiFumi from "@/components/public/members/KiyotakiFumi";
import AkaiHidekazu from "@/components/public/members/AkaiHidekazu";
import NashiroNobuo from "@/components/public/members/NashiroNobuo";
import { COACHES_DATA } from "@/public/person/coaches";
import SectionHeading from "@/components/public/ui/SectionHeading";

export default function StaffSection() {
  const coaches = COACHES_DATA;
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

          {/* コーチ */}
          <div className="mb-24">
            <CategoryHeading title="コーチ" />
            <div className="mt-8">
              <Grid persons={coaches} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
