/**
 * @file components/public/members/TeamMemberModal.tsx
 * @description 部員詳細モーダル
 *
 * 機能:
 * - 部員カードをクリックした時に表示
 * - 大きい画像と詳細情報を表示
 * - 背景クリックで閉じる
 */
"use client";

import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Person } from "@/types";
import PersonImage from "@/components/public/ui/PersonImage";

type Props = {
  person: Person;
  onClose: () => void;
};

export default function TeamMemberModal({ person, onClose }: Props) {
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
            <PersonImage
              person={person}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {person.position && (
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-gray-900 text-sm font-bold tracking-widest uppercase rounded-full shadow-lg">
                  {person.position}
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
                {person.name}
              </h2>
              {person.weight_class && (
                <p className="text-red-600 font-bold text-lg tracking-wider uppercase mb-8">
                  {person.weight_class}
                </p>
              )}

              <div className="space-y-6">
                {/* 将来的に追加情報を表示する場合はここに追加 */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
