/**
 * @file lib/fonts.ts
 * @description Google Fonts を使用したフォント設定
 *
 * 使用フォント:
 *   - Inter: 英字見出し用（Hero タイトルなど）
 *   - Noto Sans JP: 日本語本文用
 *   - Shippori Mincho: 日本語見出し・引用用
 *   - Zen Antique: 装飾的な日本語用
 */
import {
  Inter,
  Noto_Sans_JP,
  Shippori_Mincho,
  Zen_Antique,
} from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

export const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-shippori-mincho",
  display: "swap",
  preload: false,
});

export const zenAntique = Zen_Antique({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen-antique",
  display: "swap",
  preload: false,
});
