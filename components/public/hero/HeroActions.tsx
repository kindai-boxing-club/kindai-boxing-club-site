/** HeroセクションのCTAボタン */
"use client";

import Link from "next/link";
import { FaInstagram, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8 }}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center"
    >
      <Link
        href="#members"
        className="group relative px-8 py-4 bg-white text-black border-2 border-white rounded-none font-black tracking-widest overflow-hidden transition-all hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2">
          MEMBER{" "}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </span>
      </Link>

      <a
        href="https://www.instagram.com/kindaiboxing/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-8 py-4 border-2 border-white text-white rounded-none font-black tracking-widest overflow-hidden transition-all hover:bg-white hover:text-black active:scale-95"
      >
        <span className="relative z-10 flex items-center gap-2">
          <FaInstagram size={20} /> INSTAGRAM
        </span>
      </a>
    </motion.div>
  );
}
