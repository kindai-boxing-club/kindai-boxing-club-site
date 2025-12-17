/**
 * 清滝ふみカードコンポーネント
 */
"use client";

import { motion } from "framer-motion";
import { getPath } from "@/lib/utils/path";
import { Person } from "@/types";
import { useState } from "react";
import PositionBadge from "../ui/PositionBadge";
import { shipporiMincho } from "@/lib/fonts";

export default function KiyotakiFumi() {
  const person: Person = {
    id: 9901,
    name: "清滝 ふみ",
    grade: "部長",
    position: "部長",
    is_manager: 0,
    weight_class: null,
    faculty: null,
    image_url: getPath("/members/kiyotaki-fumi.webp"),
    bio: null,
  };

  const badgeColor = "bg-linear-to-r from-pink-500 to-rose-500";
  const borderGradient = "from-yellow-400 via-pink-300 to-yellow-400";

  const [imgSrc, setImgSrc] = useState(
    person.image_url || "/images/default.png"
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative max-w-md mx-auto md:max-w-none"
    >
      <div className="relative h-full bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col md:flex-row">
        {/* 装飾的な背景要素 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-pink-50 to-transparent opacity-50 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-yellow-50 to-transparent opacity-50 rounded-tr-full" />

        {/* 画像コンテナ */}
        <div className="relative h-80 md:h-auto md:w-2/5 overflow-hidden">
          <motion.img
            src={imgSrc}
            alt={person.name}
            width="800"
            height="1000"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            initial={{ filter: "grayscale(100%)" }}
            whileInView={{ filter: "grayscale(0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onError={() => setImgSrc("/images/default.png")}
          />

          {/* 役職バッジ */}
          <div className="absolute top-4 left-4">
            <PositionBadge
              label={person.grade}
              className={`${badgeColor} text-white font-shippori shadow-md`}
            />
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative bg-white">
          <h3
            className={`text-4xl ${shipporiMincho.className} font-bold font-weight-bold mb-4 tracking-wide text-slate-800 drop-shadow-sm group-hover:text-pink-600 transition-colors`}
          >
            {person.name}
          </h3>

          <div
            className={`h-0.5 w-16 bg-linear-to-r ${borderGradient} mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-500`}
          />

          <p className="text-slate-600 text-sm leading-loose font-shippori whitespace-pre-wrap tracking-wide">
            {person.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
