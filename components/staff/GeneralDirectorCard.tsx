/**
 * 総監督カードコンポーネント
 */
"use client";

import { motion } from "framer-motion";
import { Member } from "@/types";

type Props = {
  member: Member;
};

export default function GeneralDirectorCard({ member }: Props) {
  const color = "from-yellow-600 to-yellow-800";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0 }}
      className="group relative max-w-md mx-auto md:max-w-none"
    >
      {/* Card Background with Gradient Border */}
      <div className={`absolute -inset-0.5 bg-gradient-to-b ${color} opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md rounded-2xl`} />
      
      <div className="relative h-full bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 group-hover:border-gray-600 transition-colors duration-500 flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="relative w-full md:w-2/5 h-80 md:h-auto">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            initial={{ filter: "grayscale(100%)" }}
            whileInView={{ filter: "grayscale(0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          
          {/* Role Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-block px-4 py-1 bg-gradient-to-r ${color} text-white text-xs font-bold tracking-widest uppercase shadow-lg`}>
              {member.classification}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative">
          <h3 className="text-3xl font-black mb-4 tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-yellow-200 transition-colors">
            {member.name}
          </h3>
          <div className={`h-1 w-12 bg-gradient-to-r ${color} mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-500`} />
          <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
