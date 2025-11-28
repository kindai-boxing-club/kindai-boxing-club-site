/**
 * Instagramセクション
 * 公式Instagramへのリンクと、フィードのモックアップを表示する。
 */
"use client";

import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

export default function InstagramSection() {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full text-white mb-6 shadow-lg">
            <FaInstagram size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
            FOLLOW US
          </h2>
          <p className="text-gray-500 font-medium tracking-widest">
            @kindaiboxing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-4xl mx-auto bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                最新情報をチェック
              </h3>
              <p className="text-gray-600 leading-relaxed">
                日々の練習風景、試合結果、イベントの様子などをリアルタイムで発信しています。
                ボクシング部の雰囲気を知りたい方は、ぜひフォローしてください！
              </p>
              <a
                href="https://www.instagram.com/kindaiboxing/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#fd1d1d] font-bold hover:underline"
              >
                Instagramを見る →
              </a>
            </div>
            
            {/* Mockup or Placeholder for Feed */}
            <div className="grid grid-cols-2 gap-4 opacity-80">
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
