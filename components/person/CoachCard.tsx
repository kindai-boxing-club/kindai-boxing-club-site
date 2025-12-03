/**
 * コーチカードコンポーネント
 */
"use client";

import type { Person } from "@/types";

type CoachCardProps = {
  member: Person;
  onClick: () => void;
};

export default function CoachCard({ member, onClick }: CoachCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative h-full bg-gray-950 rounded-none overflow-hidden cursor-pointer border border-gray-800 hover:border-gray-600 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          width="600"
          height="800"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-transparent opacity-80" />
        
        {/* Position Badge */}
        <div className="absolute top-3 left-3">
           <span className="inline-block px-3 py-1 bg-gray-800 text-white text-xs font-bold tracking-widest uppercase border border-gray-600">
             {member.position || "COACH"}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-4">
        <h3 className="text-xl font-black text-white italic tracking-tighter mb-1 group-hover:text-gray-300 transition-colors">
          {member.name}
        </h3>
        <div className="w-8 h-1 bg-gray-700 transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
      </div>
    </div>
  );
}
