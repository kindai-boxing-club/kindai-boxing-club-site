/** トップページ */

import HeroSection from "@/components/public/hero/HeroSection";
// import ClubIntro from "@/components/public/sections/ClubIntro";
import MessageSection from "@/components/public/sections/MessageSection";
import ActivitySection from "@/components/public/sections/ActivitySection";
import StaffSection from "@/components/public/members/StaffSection";
import MemberSection from "@/components/public/members/MemberSection";
import DataSection from "@/components/public/recruit/DataSection";
import RecruitmentCTA from "@/components/public/recruit/RecruitmentCTA";
import InstagramSection from "@/components/public/sections/InstagramSection";

import { getTopPageData } from "@/lib/service/person.service";

export const runtime = "edge";

export default async function Home() {
  const { members, groupedMember, groupedStaff } = await getTopPageData();
  return (
    <div className="bg-white">
      <HeroSection />
      {/* <ClubIntro /> */}
      <MessageSection />
      <DataSection members={members} />
      <ActivitySection />
      <MemberSection groupedMembers={groupedMember} />
      <StaffSection groupedStaff={groupedStaff} />
      <RecruitmentCTA />
      <InstagramSection />
    </div>
  );
}
