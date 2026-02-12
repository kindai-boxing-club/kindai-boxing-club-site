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
  persons: Person[];
  onPersonClick?: (person: Person) => void;
};

export default function Grid({ persons, onPersonClick }: Props) {
  if (!persons || persons.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
      {persons.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          variant={person.grade === "コーチ" ? "coach" : "member"}
          onClick={onPersonClick ? () => onPersonClick(person) : undefined}
        />
      ))}
    </div>
  );
}
