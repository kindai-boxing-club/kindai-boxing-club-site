/**
 * @file components/public/members/NashiroNobuo.tsx
 * @description 名城信男（監督）専用カードコンポーネント
 */
"use client";

import { motion } from "framer-motion";
import { Person } from "@/types";
import { getPath } from "@/lib/utils/path";
import PositionBadge from "@/components/public/ui/PositionBadge";
export default function NashiroNobuo() {
  const person: Person = {
    id: 9903,
    name: "名城 信男",
    grade: "監督",
    position: "監督",
    is_manager: 0,
    weight_class: null,
    faculty: "監督",
  };

  const imgSrc = getPath("/members/nashiro-nobuo.webp");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="group relative max-w-md mx-auto md:max-w-xl w-full"
    >
      {/* <div className="absolute -inset-8 bg-gradient-to-r from-red-700 to-black opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500 rounded-none animate-pulse" /> */}

      {/* カードコンテナ -  平行四辺形 */}
      <div className="relative rounded-none shadow-[0_0_30px_rgba(153,27,27,0.2)] group-hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] group-active:shadow-[0_0_60px_rgba(220,38,38,0.6)] transform -skew-x-6 mx-1 md:mx-0 p-2 mb-8">
        {/* アニメーションボーダー背景 */}
        <div className="absolute inset-0 bg-linear-to-br from-red-950 via-red-500 to-red-950 bg-size-[400%_400%] animate-gradient-xy" />

        {/* コンテンツラッパー */}
        <div className="relative h-full w-full bg-black overflow-hidden">
          {/* 画像コンテナ */}
          <div className="relative w-full aspect-4/3 md:aspect-video transform skew-x-6 scale-115 md:scale-110 origin-center">
            <motion.img
              src={imgSrc}
              alt={person.name}
              width="1200"
              height="800"
              className="w-full h-full object-cover object-top filter contrast-110 brightness-100 transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
              initial={{ scale: 1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
          </div>

          {/* コンテンツオーバーレイ */}
          <div className="absolute inset-0 p-4 md:p-10 flex flex-col justify-end transform skew-x-6">
            {/* 役職バッジ */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <PositionBadge
                label={person.grade}
                className="border border-red-500/50 bg-black/60 backdrop-blur-md text-red-400 font-black shadow-lg"
              />
            </div>

            {/* 名前 */}
            <div className="relative z-10 flex flex-col items-center md:items-end pb-4 md:pb-2 md:pr-2">
              <h3 className="text-4xl md:text-5xl font-zen-antique text-white tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,1)] text-center md:text-right">
                {person.name}
              </h3>
              <div className="h-1 w-24 bg-red-600 mt-2 transform skew-x-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Bio (枠外に配置) - 圧倒的な黒/赤デザイン */}
      <div className="flex justify-center px-4">
        <div className="relative max-w-xl w-full transform -skew-x-6">
          {/* 背景 & ボーダー */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-red-950 to-black border border-red-800/50 shadow-[0_0_20px_rgba(220,38,38,0.3)]" />

          {/* コンテンツ (Skewを戻して文字を読みやすく) */}
          <div className="relative z-10 py-6 px-8 text-center transform skew-x-6">
            {/* 装飾ライン */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-red-500 to-transparent" />

            <p className="text-white text-lg md:text-xl font-bold font-zen-antique leading-relaxed tracking-wider drop-shadow-md">
              第16代 第18代
              <br />
              WBA世界スーパーフライ級
              <br />
              チャンピオン
            </p>

            {/* 装飾ライン (下) */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-linear-to-r from-transparent via-red-500 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
