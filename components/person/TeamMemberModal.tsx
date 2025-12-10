/**
 * メンバー詳細モーダル
 * 部員をクリックした際に表示される詳細情報モーダル。
 * 経歴などの詳細情報を表示する。
 */
/**
 * 部員詳細モーダルコンポーネント
 */
"use client";

import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Person } from "@/types";
import Image from "next/image";

type Props = {
  member: Person;
  onClose: () => void;
};

export default function TeamMemberModal({ member, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row max-h-[90vh] md:h-auto"
        >
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-[600px]">
            <Image
              src={member.image || "/images/placeholder.webp"}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {member.position && (
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-gray-900 text-sm font-bold tracking-widest uppercase rounded-full shadow-lg">
                  {member.position}
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-8 md:p-12 flex flex-col relative overflow-y-auto bg-white">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 z-10"
            >
              <FaTimes size={20} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">
                {member.name}
              </h2>
              {member.weight && (
                <p className="text-red-600 font-bold text-lg tracking-wider uppercase mb-8">
                  {member.weight}
                </p>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                    BIOGRAPHY
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {member.bio || "No biography available."}
                  </p>
                </div>

                {/* Additional details can be added here if available in the Member type */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
