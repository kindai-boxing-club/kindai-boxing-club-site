/**
 * トップページコンポーネント
 */

import HeroSection from "@/components/sections/HeroSection";
import ClubIntro from "@/components/sections/ClubIntro";
import MessageSection from "@/components/sections/MessageSection";
import ActivitySection from "@/components/sections/ActivitySection";
import StaffSection from "@/components/sections/StaffSection";
import MemberSection from "@/components/sections/MemberSection";
import RecruitmentCTA from "@/components/sections/RecruitmentCTA";
import InstagramSection from "@/components/sections/InstagramSection";

export default async function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <ClubIntro />
      <MessageSection />
      <ActivitySection />
      <MemberSection/>
      <StaffSection/>
      <RecruitmentCTA />
      <InstagramSection />
    </div>
  );
}
