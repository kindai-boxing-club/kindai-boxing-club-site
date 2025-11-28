/**
 * 部長カードコンポーネント
 */
"use client";

import { motion } from "framer-motion";
import { Member } from "@/types";

type Props = {
  member: Member;
};

export default function PresidentCard({ member }: Props) {
  // Theme: White (Base) + Gold (Elegance) + Pink (Cute/Accent)
  const borderGradient = "from-yellow-200 via-pink-200 to-yellow-400";
  const badgeColor = "bg-gradient-to-r from-pink-400 to-rose-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="group relative max-w-md mx-auto md:max-w-none"
    >
      {/* Elegant Border Frame (Gold & Pink Glow) */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${borderGradient} opacity-40 blur-md group-hover:opacity-80 transition-opacity duration-500 rounded-2xl`} />
      
      <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-yellow-100 group-hover:border-pink-200 transition-colors duration-500 flex flex-col md:flex-row shadow-xl">
        {/* Image Container */}
        <div className="relative w-full md:w-2/5 h-80 md:h-auto overflow-hidden">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            initial={{ filter: "grayscale(100%)" }}
            whileInView={{ filter: "grayscale(0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Specific Overlay: White fade at bottom for smooth transition to content if needed, 
              but since it's side-by-side on desktop, maybe just a subtle inner shadow or gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-50" />
          
          {/* Decorative Frame Lines (Gold) */}
          <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-yellow-400/60" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-yellow-400/60" />
          
          {/* Role Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-4 py-1 ${badgeColor} text-white text-xs font-serif tracking-widest uppercase shadow-md rounded-full`}>
              {member.classification}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative bg-white">


          <h3 className="text-4xl font-serif font-medium mb-4 tracking-wide text-slate-800 drop-shadow-sm group-hover:text-pink-600 transition-colors">
            {member.name}
          </h3>
          
          <div className={`h-0.5 w-16 bg-gradient-to-r ${borderGradient} mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500`} />
          
          <p className="text-slate-600 text-sm leading-loose font-serif whitespace-pre-wrap tracking-wide">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
