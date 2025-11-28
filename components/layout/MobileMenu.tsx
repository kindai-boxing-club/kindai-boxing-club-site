/**
 * モバイルメニューコンポーネント
 * スマートフォン向けのフルスクリーンメニュー。
 * アニメーション付きの表示・非表示切り替えを提供する。
 */
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; href: string }[];
};

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  }
} as const;

const itemVariants = {
  closed: { opacity: 0, x: 50 },
  open: { opacity: 1, x: 0 }
};

export default function MobileMenu({ isOpen, onClose, links }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed top-0 left-0 w-screen h-[100dvh] z-[60] bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center md:hidden"
          onClick={onClose}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-900/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
          </div>

          <div 
            className="flex flex-col gap-8 text-center relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link) => (
              <motion.div key={link.name} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="text-4xl font-black text-white hover:text-red-500 transition-colors tracking-tighter"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div variants={itemVariants} className="mt-8">
              <a
                href="https://www.instagram.com/kindaiboxing/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
              >
                <FaInstagram className="text-[#fd1d1d]" />
                Official Instagram
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
