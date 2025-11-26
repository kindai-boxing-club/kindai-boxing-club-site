"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

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

  const textColor = scrolled ? "text-gray-900" : "text-white";

  return (
    <nav
      className={`fixed w-full z-50 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="近畿大学体育会ボクシング部"
              width={200}
              height={48}
              className="h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`${textColor} hover:text-red-600`}>
              ホーム
            </Link>
            <a href="#members" className={`${textColor} hover:text-red-600`}>
              部員紹介
            </a>
            <Link href="/blog" className={`${textColor} hover:text-red-600`}>
              ブログ
            </Link>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${textColor} hover:text-red-600`}
            >
              Instagram
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${textColor}`}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="p-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              ホーム
            </Link>
            <a
              href="#members"
              className="block px-3 py-2 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              部員紹介
            </a>
            <Link
              href="/blog"
              className="block px-3 py-2 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              ブログ
            </Link>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 hover:bg-gray-100 rounded"
            >
              Instagram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
