/**
 * @file app/(public)/page.tsx
 * @description 公開サイトのトップページ
 *
 * 役割:
 * - トップページの各セクションを順番に配置
 * - Edge Runtime で実行（Cloudflare D1 アクセスのため）
 *
 * セクション構成:
 *   1. HeroSection: ファーストビュー
 *   2. ClubIntro: 部の紹介
 *   3. MessageSection: 主将挨拶
 *   4. ActivitySection: 活動内容
 *   5. MemberSection: 部員紹介
 *   6. StaffSection: スタッフ紹介
 *   7. RecruitmentCTA: 入部案内
 *   8. InstagramSection: SNS 連携
 *
 * URL: /
 */

import HeroSection from "@/components/public/hero/HeroSection";
import ClubIntro from "@/components/public/sections/ClubIntro";
import MessageSection from "@/components/public/sections/MessageSection";
import ActivitySection from "@/components/public/sections/ActivitySection";
import StaffSection from "@/components/public/members/StaffSection";
import MemberSection from "@/components/public/members/MemberSection";
import RecruitmentCTA from "@/components/public/sections/RecruitmentCTA";
import InstagramSection from "@/components/public/sections/InstagramSection";

export const runtime = "edge";

export default async function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <ClubIntro />
      <MessageSection />
      <ActivitySection />
      <MemberSection />
      <StaffSection />
      <RecruitmentCTA />
      <InstagramSection />
    </div>
  );
}
