/** トップページ */

import HeroSection from "@/components/public/hero/HeroSection";
import ClubIntro from "@/components/public/sections/ClubIntro";
import MessageSection from "@/components/public/sections/MessageSection";
import ActivitySection from "@/components/public/sections/ActivitySection";
import StaffSection from "@/components/public/members/StaffSection";
import MemberSection from "@/components/public/members/MemberSection";
import ClubStatsSection from "@/components/public/recruit/ClubStatsSection";
import RecruitmentCTA from "@/components/public/recruit/RecruitmentCTA";
import InstagramSection from "@/components/public/sections/InstagramSection";

export const runtime = "edge";

export default async function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <ClubIntro />
      <MessageSection />
      <ClubStatsSection />
      <ActivitySection />
      <MemberSection />
      <StaffSection />
      <RecruitmentCTA />
      <InstagramSection />
    </div>
  );
}
