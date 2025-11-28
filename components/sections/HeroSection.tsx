/**
 * ヒーローセクション
 * サイトのファーストビューを担当。パララックス効果、ノイズオーバーレイ、
 * アニメーション付きのタイポグラフィなど、視覚的なインパクトを重視した演出を含む。
 */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaArrowRight, FaChevronDown } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax and Transform effects
  const y = useTransform(scrollY, [0, 500], ["0%", "50%"]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.5]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Background Image with Zoom Effect */}
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/bg_hero.png"
          alt="Boxing Club Background"
          fill
          className="object-cover object-center opacity-60"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/90" />
      </div>

      {/* Red Blur Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-600/20 rounded-full blur-[120px] animate-pulse z-0 pointer-events-none" />

      {/* Content Container */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center text-white"
        style={{ y, opacity, scale }}
      >
        {/* Main Title */}
        {/* Main Title */}
        <div className="mb-8 relative z-20">
          <h1 className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter uppercase mix-blend-difference flex flex-col items-center">
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


        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link
            href="#members"
            className="group relative px-8 py-4 bg-white text-black border-2 border-white rounded-none font-black tracking-widest overflow-hidden transition-all hover:bg-red-600 hover:text-white hover:border-red-600"
          >
            <span className="relative z-10 flex items-center gap-2">
              MEMBER <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <a
            href="https://www.instagram.com/kindaiboxing/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 border-2 border-white text-white rounded-none font-black tracking-widest overflow-hidden transition-all hover:bg-white hover:text-black"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaInstagram size={20} /> INSTAGRAM
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
      >
        <span className="text-xs tracking-[0.5em] uppercase text-gray-500 font-bold">SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
