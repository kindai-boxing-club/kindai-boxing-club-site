/**
 * ヒーローセクションのタイトルアニメーションコンポーネント
 */
"use client";

import { motion } from "framer-motion";

export default function HeroTitle() {
  return (
    <div className="mb-8 relative z-20">
      <h1 className="text-[19vw] sm:text-[17vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw] font-black leading-none tracking-tighter uppercase mix-blend-difference flex flex-col items-center">
        <span className="flex overflow-hidden">
          {"KINDAI".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.05,
              }}
              className="block text-white"
            >
              {char}
            </motion.span>
          ))}
        </span>
        <span className="flex overflow-hidden">
          {"BOXING".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4 + i * 0.05,
              }}
              className="block text-red-600"
            >
              {char}
            </motion.span>
          ))}
        </span>
      </h1>
    </div>
  );
}
