/**
 * @file components/public/sections/RecruitmentCTA.tsx
 * @description 入部募集 CTA セクション
 */
"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

export default function RecruitmentCTA() {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-red-900 via-black to-black" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            JOIN THE <span className="text-red-600">TEAM</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            経験者はもちろん、未経験者も大歓迎。
            <br />
            ボクシングを通じて、一生モノの仲間と強さを手に入れよう。
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="https://www.instagram.com/kindaiboxing/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(253,29,29,0.4)] active:scale-95 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaInstagram size={20} /> InstagramでDMする
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </a>

            {/* <Link
              href="/blog"
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 hover:bg-white/20 active:scale-95 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaPenNib size={18} /> 活動記録を見る
              </span>
            </Link> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
