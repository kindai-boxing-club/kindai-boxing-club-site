/**
 * @file components/public/sections/ClubIntro.tsx
 * @description 部の精神（OUR SPIRIT）セクション
 */
"use client";

import { motion } from "framer-motion";
import { FaDumbbell, FaHandshake, FaTrophy } from "react-icons/fa";
import SectionHeading from "@/components/public/ui/SectionHeading";

const features = [
  {
    id: "01",
    icon: FaDumbbell,
    title: "強靭",
    subtitle: "強靭な肉体と精神",
    description:
      "限界を超えた先にしか見えない景色がある。日々の過酷なトレーニングが、揺るぎない自信と強さを創り出す。",
    delay: 0.2,
  },
  {
    id: "02",
    icon: FaHandshake,
    title: "結束",
    subtitle: "結束と信頼",
    description:
      "同じリングを目指す仲間との絆。苦しみを分かち合い、互いに鼓舞し合うことで、個の力は無限に増幅する。",
    delay: 0.4,
  },
  {
    id: "03",
    icon: FaTrophy,
    title: "挑戦",
    subtitle: "挑戦への執念",
    description:
      "目指すは頂点のみ。妥協なき挑戦の連続が、我々を勝利へと導く。敗北を恐れず、ただ前へ。",
    delay: 0.6,
  },
];

export default function ClubIntro() {
  return (
    <section className="py-32 px-4 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* セクションヘッダー */}
        <SectionHeading
          title="OUR SPIRIT"
          subtitle="近大ボクシング部の精神"
          bg="dark"
        />

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              className="group relative"
            >
              {/* Large Background Number */}
              <div className="absolute -top-12 -left-6 text-9xl font-black text-gray-900 opacity-50 select-none z-0 transition-colors duration-500 group-hover:text-red-900/20">
                {feature.id}
              </div>

              <div className="relative z-10 border-l-2 border-gray-800 pl-8 py-4 transition-colors duration-300 group-hover:border-red-600">
                <div className="mb-6 text-red-600">
                  <feature.icon size={40} />
                </div>

                <h3 className="text-3xl font-black text-white mb-2 tracking-tight uppercase italic">
                  {feature.title}
                </h3>
                <p className="text-sm font-bold text-red-600 mb-4 tracking-widest uppercase">
                  {feature.subtitle}
                </p>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
