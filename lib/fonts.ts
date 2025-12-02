/**
 * フォント設定ファイル
 */
import { Noto_Sans_JP, Shippori_Mincho, Zen_Antique } from "next/font/google";

export const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-shippori-mincho",
});

export const zenAntique = Zen_Antique({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zen-antique",
});
