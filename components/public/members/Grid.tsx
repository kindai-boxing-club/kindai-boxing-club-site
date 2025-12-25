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
 * グリッド表示コンポーネント
 */
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
