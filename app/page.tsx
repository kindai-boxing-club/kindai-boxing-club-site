/**
 * トップページコンポーネント
 * 
 * 役割: サイトのメインエントリーポイント
 * 機能:
 * - 各セクション（ヒーロー、紹介、活動、部員、スタッフ）の統合
 * - サーバーサイドでのデータ取得（部員、コーチ、幹部）
 * - データのグルーピングと整列
 */
import Link from "next/link";

import { fetchMembers, fetchCoaches, fetchExecutives } from "@/lib/data/fetchMembers";
import {
  groupByClassification,
  orderKeys,
  memberClassificationOrder,
  staffClassificationOrder,
  memberClassificationDisplay,
  staffClassificationDisplay,
} from "@/lib/data/grouping";
import MemberSection from "@/components/sections/MemberSection";
import HeroSection from "@/components/sections/HeroSection";
import ClubIntro from "@/components/sections/ClubIntro";
import ActivitySection from "@/components/sections/ActivitySection";
import RecruitmentCTA from "@/components/sections/RecruitmentCTA";
import InstagramSection from "@/components/sections/InstagramSection";

export default async function Home() {
  // ローカルCSVから部員データとスタッフデータを取得
  const members = await fetchMembers();
  const coaches = await fetchCoaches();
  const executives = await fetchExecutives();
  
  // スタッフに幹部を含める
  const staff = [...executives, ...coaches];

  const membersByClassification = groupByClassification(members);
  const staffByClassification = groupByClassification(staff);

  const memberGroupKeys = orderKeys(
    membersByClassification,
    memberClassificationOrder
  );
  const staffGroupKeys = orderKeys(
    staffByClassification,
    staffClassificationOrder
  );

  return (
    <div className="bg-white">
      {/* ヒーローセクション */}
      <HeroSection />

      {/* クラブ紹介セクション */}
      <ClubIntro />

      {/* 活動内容セクション */}
      <ActivitySection />

      {/* 部員紹介セクション */}
      <MemberSection
        sectionId="members"
        title="MEMBERS"
        subtitle="ともにトレーニングに励む仲間たち"
        groups={membersByClassification}
        groupKeys={memberGroupKeys}
        displayNames={memberClassificationDisplay}
        bgColor="bg-white"
      />

      {/* スタッフ紹介セクション */}
      <MemberSection
        sectionId="staff"
        title="STAFF"
        subtitle="チームを支えるスタッフ"
        groups={staffByClassification}
        groupKeys={staffGroupKeys}
        displayNames={staffClassificationDisplay}
        bgColor="bg-gray-50"
      />

      {/* 入部募集CTA */}
      <RecruitmentCTA />

      {/* Instagram/SNSセクション */}
      <InstagramSection />
    </div>
  );
}
