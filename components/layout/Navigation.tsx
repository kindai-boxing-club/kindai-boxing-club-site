/**
 * ナビゲーションバーコンポーネント
 * サイト全体のヘッダーナビゲーション。
 * スクロールに応じたスタイル変化やモバイルメニューの制御を行う。
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

import MobileMenu from "./MobileMenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navBg = scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent";

  const links = [
    { name: "ホーム", href: "/" },
    { name: "部員紹介", href: "#members" },
    { name: "ブログ", href: "/blog" },

  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="relative z-50">
            <Image
              src="/images/logo.png"
              alt="近畿大学体育会ボクシング部"
              width={200}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="text-white hover:text-red-500 transition-colors font-medium tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/kindaiboxing/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <FaInstagram /> Instagram
            </a>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-[70] text-white p-2"
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white block transition-all origin-center"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-white block transition-all"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -11 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white block transition-all origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} links={links} />
    </nav>
  );
}
