/**
 * ヒーローセクションのスクロールインジケーターコンポーネント
 */
"use client";

import { motion, MotionValue } from "framer-motion";

type Props = {
  opacity: MotionValue<number>;
};

export default function ScrollIndicator({ opacity }: Props) {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      style={{ opacity }}
    >
      <span className="text-xs tracking-[0.5em] uppercase text-gray-500 font-bold">
        SCROLL
      </span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-px h-12 bg-linear-to-b from-red-600 to-transparent"
      />
    </motion.div>
  );
}
