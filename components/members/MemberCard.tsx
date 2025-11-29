/**
 * メンバーカードコンポーネント
 * 個々の部員情報を表示するカード。
 * 通常メンバー用と特別職用の2つのバリエーションを持つ。
 */
"use client";

import { motion } from "framer-motion";

import type { Member } from "@/types";

type MemberCardProps = {
  member: Member;
  onClick: () => void;
  variant?: "standard" | "wide" | "coach";
};

export default function MemberCard({ member, onClick, variant = "standard" }: MemberCardProps) {
  // Wide variant for special roles (Director, etc.) - though now handled by separate components, keeping for fallback
  if (variant === "wide") {
    return (
      <div 
        onClick={onClick}
        className="group relative h-full bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 hover:border-red-600 transition-colors duration-500 flex flex-row"
      >
        {/* Image Section */}
        <div className="relative w-1/3 aspect-[3/4]">
          <img
            src={member.image}
            alt={member.name}
            width="600"
            height="800"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/90" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <div className="w-24 h-24 border-4 border-red-600 rounded-full" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold tracking-widest uppercase skew-x-[-12deg]">
                {member.position || member.classification}
              </span>
            </div>
            
            <h3 className="text-3xl font-black text-white italic tracking-tighter mb-2 group-hover:text-red-500 transition-colors">
              {member.name}
            </h3>
            
            {member.faculty && (
              <p className="text-gray-400 text-sm mb-4">{member.faculty}</p>
            )}
            
            <div className="w-12 h-1 bg-red-600 transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
          </div>
        </div>
      </div>
    );
  }

  // Coach Variant (Black Theme)
  if (variant === "coach") {
    return (
      <div 
        onClick={onClick}
        className="group relative h-full bg-gray-950 rounded-none overflow-hidden cursor-pointer border border-gray-800 hover:border-gray-600 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            width="600"
            height="800"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
          
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

  // Standard Variant (White Theme)
  return (
    <div 
      onClick={onClick}
      className="group relative h-full bg-white rounded-none overflow-hidden cursor-pointer border-b-4 border-transparent hover:border-red-600 transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={member.image}
          alt={member.name}
          width="600"
          height="800"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Position Badge (Only if position exists) */}
        {member.position && (
          <div className="absolute top-2 left-2">
             <span className="inline-block px-2 py-0.5 bg-black text-white text-[10px] font-bold tracking-widest uppercase skew-x-[-12deg]">
               {member.position}
             </span>
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
