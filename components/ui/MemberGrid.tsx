/**
 * 部員グリッドコンポーネント
 * メンバーカードをグリッド状に配置する。
 * 特別職（監督など）の場合は中央揃えのレイアウトを適用する。
 */
"use client";

import { Member } from "@/types";
import MemberCard from "./MemberCard";
import PresidentCard from "../staff/PresidentCard";
import GeneralDirectorCard from "../staff/GeneralDirectorCard";
import DirectorCard from "../staff/DirectorCard";

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
          if (member.classification === "部長") return <PresidentCard key={member.id} member={member} />;
          if (member.classification === "総監督") return <GeneralDirectorCard key={member.id} member={member} />;
          if (member.classification === "監督") return <DirectorCard key={member.id} member={member} />;
          
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
