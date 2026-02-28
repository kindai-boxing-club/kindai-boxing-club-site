/** メンバーカードのグリッドレイアウト */
"use client";
import { Member, Staff } from "@/types";
import PersonCard from "./PersonCard";

type Props = {
  persons: Member[] | Staff[];
  onPersonClick?: (person: Member | Staff) => void;
};

export default function Grid({ persons, onPersonClick }: Props) {
  if (!persons || persons.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
      {persons.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          onClick={onPersonClick ? () => onPersonClick(person) : undefined}
        />
      ))}
    </div>
  );
}
