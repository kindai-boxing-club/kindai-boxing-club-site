/**
 * 赤井英和カードコンポーネント
 */
"use client";

import { motion } from "framer-motion";
import { Person } from "@/types";
import { getPath } from "@/lib/utils/path";
import PositionBadge from "@/components/public/ui/PositionBadge";

export default function AkaiHidekazu() {
  const person: Person = {
    id: 9902,
    name: "赤井 英和",
    grade: "総監督",
    position: "総監督", // カードに表示
    is_manager: false,
    weight_class: null,
    faculty: "総監督", // 仮の値（後で適切な学部名に変更）
  };

  const imgSrc = getPath("/members/akai-hidekazu.webp");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="group relative max-w-md mx-auto md:max-w-none active:scale-[0.99] transition-transform duration-200"
    >
      <div className="absolute -inset-1 bg-linear-to-r from-red-600 via-orange-500 to-red-600 rounded-none blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

      <div className="relative h-full bg-black rounded-none overflow-hidden border border-red-900/50 flex flex-col md:flex-row shadow-2xl">
        {/* 画像コンテナ */}
        <div className="relative w-full md:w-2/5 h-80 md:h-auto overflow-hidden">
          <motion.img
            src={imgSrc}
            alt={person.name}
            width="800"
            height="1000"
            className="w-full h-full object-cover object-top filter contrast-125 brightness-90 group-hover:brightness-110 group-active:brightness-110 transition-all duration-500"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* オーバーレイグラデーション */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />

          {/* 役職バッジ */}
          <div className="absolute top-4 left-4">
            <PositionBadge
              label={person.grade}
              className="bg-linear-to-r from-red-600 to-orange-600 text-white shadow-lg"
            />
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative bg-linear-to-br from-black to-red-950/30">
          <div className="relative z-10">
            <motion.span
              className="block text-orange-500 font-black tracking-[0.2em] text-sm mb-2 uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              浪速のロッキー
            </motion.span>

            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-b from-yellow-300 to-red-600 mb-4 tracking-tighter drop-shadow-sm filter">
              {person.name}
            </h3>

            {/* エネルギーバー装飾 */}
            <div className="h-1 mb-1 bg-[linear-gradient(90deg,var(--color-yellow-500)_0%,var(--color-red-500)_30%,transparent_60%)]" />
            <div className="h-2 mb-1 bg-[linear-gradient(90deg,var(--color-yellow-500)_0%,var(--color-red-500)_50%,transparent_80%)]" />
            <div className="h-3 mb-1 bg-[linear-gradient(90deg,var(--color-yellow-500)_0%,var(--color-red-500)_70%,transparent_100%)]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
