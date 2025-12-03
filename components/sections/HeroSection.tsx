/**
 * ヒーローセクション
 */
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBackground from "../hero/HeroBackground";
import HeroTitle from "../hero/HeroTitle";
import HeroActions from "../hero/HeroActions";
import HeroScrollIndicator from "../hero/HeroScrollIndicator";

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
      <HeroBackground />

      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full px-1 text-center text-white"
        style={{ y, opacity, scale }}
      >
        <HeroTitle />
        <HeroActions />
      </motion.div>

      <HeroScrollIndicator opacity={opacity} />
    </section>
  );
}
