/**
 * 赤井英和カードコンポーネント
 */
"use client";

import { motion } from "framer-motion";

export default function AkaiHidekazu() {
  const member = {
    name: "赤井 英和",
    classification: "総監督",
    image: "/data/staff/赤井英和.png",
    bio: "第16代 第18代 WBA世界スーパーフライ級チャンピオン",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="group relative max-w-md mx-auto md:max-w-none"
    >
      {/* アニメーション付きグラデーションボーダー */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      
      {/* テーマ: レジェンド（赤、黒、金 - 炎と力強さ） */}
      <div className="relative h-full bg-black rounded-2xl overflow-hidden border border-red-900/50 flex flex-col md:flex-row shadow-2xl">
        
        {/* 画像コンテナ */}
        <div className="relative w-full md:w-2/5 h-80 md:h-auto overflow-hidden">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top filter contrast-125 brightness-90 group-hover:brightness-110 transition-all duration-500"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* オーバーレイグラデーション */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          {/* 役職バッジ */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xs font-black tracking-widest uppercase shadow-lg skew-x-[-10deg]">
              {member.classification}
            </span>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative bg-gradient-to-br from-black to-red-950/30">
          <div className="relative z-10">
            <motion.span 
              className="block text-orange-500 font-black tracking-[0.2em] text-sm mb-2 uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              浪速のロッキー
            </motion.span>
            
            <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-red-600 mb-4 tracking-tighter drop-shadow-sm filter">
              {member.name}
            </h3>
            
            <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 via-red-500 to-transparent mb-6" />
            
            <p className="text-red-100 text-sm font-bold leading-relaxed drop-shadow-md whitespace-pre-wrap">
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
