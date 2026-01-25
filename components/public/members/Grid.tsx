/**
 * @file components/public/members/Grid.tsx
 * @description メンバーカードをグリッド状に配置するコンポーネント
 *
 * 機能:
 * - 2〜3列のレスポンシブグリッド
 * - 部員/コーチを PersonCard で表示
 * - クリック時のコールバック対応
 */
"use client";
import { Person } from "@/types";
import PersonCard from "./PersonCard";

type Props = {
  members: Person[];
  onMemberClick?: (member: Person) => void;
};

export default function Grid({ members, onMemberClick }: Props) {
  if (!members || members.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
      {members.map((member) => (
        <PersonCard
          key={member.id}
          member={member}
          variant={member.grade === "コーチ" ? "coach" : "member"}
          onClick={onMemberClick ? () => onMemberClick(member) : undefined}
        />
      ))}
    </div>
  );
}
