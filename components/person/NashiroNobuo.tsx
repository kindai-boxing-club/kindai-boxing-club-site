/**
 * 名城信男カードコンポーネント
 */
"use client";

import { motion } from "framer-motion";
import { Person } from "@/types";
import { getPath } from "@/lib/utils/path";
export default function NashiroNobuo() {
  const person: Person = {
    id: 9903,
    name: "名城 信男",
    grade: "監督",
    position: "監督",
    is_manager: 0,
    weight_class: null,
    faculty: null,
    image_url: getPath("/staff/nashiro-nobuo.webp"),
    bio: "第16代 第18代 WBA世界スーパーフライ級チャンピオン",
  };

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
      <div className="relative rounded-none shadow-[0_0_30px_rgba(153,27,27,0.2)] group-hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] transform -skew-x-6 mx-1 md:mx-0 p-2">
        {/* アニメーションボーダー背景 */}
        <div className="absolute inset-0 bg-linear-to-br from-red-950 via-red-500 to-red-950 bg-size-[400%_400%] animate-gradient-xy" />

        {/* コンテンツラッパー */}
        <div className="relative h-full w-full bg-black overflow-hidden">
          {/* 画像コンテナ - 自然なアスペクト比 */}
          <div className="relative w-full h-[550px] md:h-auto transform skew-x-6 scale-110 origin-center">
            <motion.img
              src={person.image_url || "/images/default.png"}
              alt={person.name}
              width="1200"
              height="800"
              className="w-full h-full object-cover object-top filter contrast-110 brightness-100 transition-transform duration-700 group-hover:scale-105"
              initial={{ scale: 1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* グラデーションオーバーレイ: 下部を濃く */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/5 to-transparent " />
          </div>

          {/* 浮遊する赤い粒子（控えめ） */}
          {/* <div className="absolute bottom-0 left-0 w-full h-1/2 overflow-hidden pointer-events-none transform skew-x-6">
             <div className="absolute bottom-[-20%] left-[-10%] w-1/2 h-1/2 bg-red-600/20 blur-[80px] rounded-full mix-blend-screen animate-pulse" />
             <div className="absolute bottom-[-20%] right-[-10%] w-1/2 h-1/2 bg-red-800/20 blur-[80px] rounded-full mix-blend-screen animate-pulse" />
          </div> */}

          {/* コンテンツオーバーレイ */}
          <div className="absolute inset-0 p-4 md:p-10 flex flex-col justify-end transform skew-x-6">
            {/* 役職バッジ */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <span className="inline-block px-4 py-1 border border-red-500/50 bg-black/60 backdrop-blur-md text-red-400 font-black tracking-widest text-sm uppercase shadow-lg transform -skew-x-6">
                <span className="block transform skew-x-6">{person.grade}</span>
              </span>
            </div>

            {/* 下部テキストコンテンツ */}
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-zen-antique text-white mb-4 md:mb-6 tracking-tighter drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
                {person.name}
              </h3>

              {/* エネルギーバー装飾 */}
              <div className="h-1.5 w-32 md:w-48 bg-neutral-800 rounded-full mb-4 md:mb-6 overflow-hidden border border-neutral-700">
                <div className="h-full w-full bg-linear-to-r from-red-900 via-red-500 to-red-900 animate-[shimmer_2s_infinite]" />
              </div>

              <p className="text-neutral-200 text-sm md:text-base font-bold leading-relaxed whitespace-pre-wrap p-2  bg-black/10 backdrop-blur-sm  rounded-r-lg max-w-xl text-center">
                {person.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
