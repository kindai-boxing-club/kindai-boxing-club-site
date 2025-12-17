/**
 * メンバーカードコンポーネント
 */
"use client";

/**
 * 部員カードコンポーネント
 */
import type { Person } from "@/types";
import PersonImage from "../ui/PersonImage";

type MemberCardProps = {
  member: Person;
  onClick?: () => void;
};

export default function MemberCard({ member, onClick }: MemberCardProps) {
  // Standard Variant (White Theme)
  return (
    <div
      onClick={onClick}
      className={`group relative h-full bg-white rounded-none overflow-hidden border-b-4 border-transparent hover:border-red-600 transition-all duration-300 shadow-sm hover:shadow-xl ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
        <PersonImage
          person={member}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Position Badge (Only if position exists) */}
        {/* Position Badge (Only if position exists) */}
        {member.position && (
          <div className="absolute top-2 left-2">
            <div className="inline-block px-2 py-0.5 bg-black -skew-x-12">
              <span className="block text-white text-[10px] font-bold tracking-widest uppercase skew-x-12">
                {member.position}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 relative">
        <h3 className="text-lg font-black text-gray-900 italic tracking-tighter mb-1 group-hover:text-red-600 transition-colors relative z-10">
          {member.name}
        </h3>

        {member.faculty && (
          <p className="text-xs text-gray-500 font-medium relative z-10 line-clamp-1">
            {member.faculty}
          </p>
        )}
      </div>
    </div>
  );
}
