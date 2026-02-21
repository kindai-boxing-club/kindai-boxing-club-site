/** 部員募集（RECRUIT）セクション */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import SectionHeading from "@/components/public/ui/SectionHeading";

export default function MessageSection() {
  return (
    <section className="py-32 px-4 bg-white relative overflow-hidden">
      {/* 背景装飾 - 他のセクションと合わせる */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform origin-top-left z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* セクションヘッダー */}
        <SectionHeading title="RECRUIT" subtitle="部員募集" bg="light" />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 leading-relaxed">
              新しい仲間を
              <br className="md:hidden" />
              いつでも待っています
            </h3>

            <div className="bg-gray-50 p-8 md:p-12 rounded-none border-l-4 border-red-600 text-left mb-12 shadow-sm">
              <p className="text-gray-700 leading-loose text-lg mb-8">
                近畿大学ボクシング部では、一緒に汗を流す仲間を募集しています。
                <br />
                ボクシングの経験は問いません。初心者から経験者まで、それぞれの目標に向かって活動しています。
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✓</span>
                  <span className="font-bold text-gray-800">
                    未経験者・初心者 歓迎
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✓</span>
                  <span className="font-bold text-gray-800">
                    経験者・実力者 歓迎
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✓</span>
                  <span className="font-bold text-gray-800">
                    男女問わず募集中
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✓</span>
                  <span className="font-bold text-gray-800">
                    選手・マネージャー募集
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✓</span>
                  <span className="font-bold text-gray-800">
                    体格・体力は問いません
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✓</span>
                  <span className="font-bold text-gray-800">
                    見学・体験 いつでもOK
                  </span>
                </div>
              </div>

              <p className="text-gray-700 leading-loose">
                「強くなりたい」「新しいことに挑戦したい」「大学生活を充実させたい」
                <br />
                そんな想いがあれば十分です。まずは一度、練習を見に来てください。
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="text-lg font-bold text-gray-900">
                見学希望や質問は、InstagramのDMから
                <br className="md:hidden" />
                お気軽にご連絡ください
              </p>

              <Link
                href="https://www.instagram.com/kindaiboxing/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-10 text-lg rounded-full hover:opacity-90 transition-opacity shadow-lg transform hover:-translate-y-1"
              >
                <FaInstagram size={24} />
                <span>Instagramでメッセージを送る</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
