/**
 * ブログページ（準備中）
 * ユーザーに開発中であることを優しく伝えるためのプレースホルダーページ。
 */
"use client";

/**
 * ブログ一覧ページコンポーネント
 */
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTools } from "react-icons/fa";

export default function BlogPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-neutral-900 rounded-full shadow-sm border border-neutral-800">
            <FaTools className="text-4xl text-neutral-600" />
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl font-black text-white mb-6 font-shippori tracking-widest">
          延長戦中
        </h1>

        <p className="text-gray-400 text-sm leading-relaxed text-center mb-4">
           (ボクシングなのに)
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-red-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          トップページに戻る
        </Link>
      </motion.div>
    </div>
  );
}
