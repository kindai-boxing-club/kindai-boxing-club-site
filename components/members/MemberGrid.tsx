/**
 * 部員グリッドコンポーネント
 * 
 * 役割: メンバーカードをグリッド状に配置して表示する
 * 機能:
 * - 通常のメンバー（コーチ含む）はグリッド表示
 * - 幹部（部長、総監督、監督）は特別なコンポーネントとしてリスト表示
 * - クリック時のモーダル表示ハンドリング
 */
"use client";

/**
 * 部員一覧グリッド表示コンポーネント
 */
import { motion } from "framer-motion";
import { Member } from "@/types";
import dynamic from "next/dynamic";
import MemberCard from "./MemberCard";

const KiyotakiFumi = dynamic(() => import("./executives/KiyotakiFumi"));
const AkaiHidekazu = dynamic(() => import("./executives/AkaiHidekazu"));
const NashiroNobuo = dynamic(() => import("./executives/NashiroNobuo"));

type Props = {
  members: Member[];
  isSpecialRole: boolean;
  onMemberClick: (member: Member) => void;
};

export default function MemberGrid({
  members,
  isSpecialRole,
  onMemberClick,
}: Props) {
  if (isSpecialRole) {
    return (
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {members.map((member) => {
          if (member.classification === "部長") return <KiyotakiFumi key={member.id} />;
          if (member.classification === "総監督") return <AkaiHidekazu key={member.id} />;
          if (member.classification === "監督") return <NashiroNobuo key={member.id} />;
          
          return (
            <MemberCard 
              key={member.id}
              member={member} 
              onClick={() => onMemberClick(member)}
              variant="wide"
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
      {members.map((member) => (
        <div 
          key={member.id}
          className="transform hover:-translate-y-1 transition-transform duration-300"
        >
          <MemberCard 
            member={member} 
            onClick={() => onMemberClick(member)}
            variant={member.classification === "コーチ" ? "coach" : "standard"}
          />
        </div>
      ))}
    </div>
  );
}
