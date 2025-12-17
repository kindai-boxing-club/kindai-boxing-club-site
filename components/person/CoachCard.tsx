/**
 * コーチカードコンポーネント
 */
"use client";

import type { Person } from "@/types";
import PersonImage from "../ui/PersonImage";
import PositionBadge from "../ui/PositionBadge";

type CoachCardProps = {
  member: Person;
  onClick?: () => void;
};

export default function CoachCard({ member, onClick }: CoachCardProps) {
  return (
    <div
      onClick={onClick}
      className={`group relative h-full bg-gray-950 rounded-none overflow-hidden border border-yellow-900/30 hover:border-yellow-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden">
        <PersonImage
          person={member}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Position Badge */}
        <div className="absolute top-3 left-3">
          <PositionBadge
            label={member.position || "COACH"}
            className="bg-black/80 backdrop-blur-sm text-yellow-500 border border-yellow-900/50"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 relative flex flex-col items-center text-center">
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-b from-[#b8860b] via-[#ffd700] to-[#b8860b] mb-4 tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] filter">
          {member.name}
        </h3>
        <div className="w-16 h-px bg-linear-to-r from-transparent via-yellow-600 to-transparent mx-auto transform origin-center group-hover:scale-x-150 transition-transform duration-300" />
      </div>
    </div>
  );
}
