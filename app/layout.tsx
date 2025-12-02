/**
 * ルートレイアウト
 */
import type { Metadata, Viewport } from "next";

import { notoSansJP, shipporiMincho, zenAntique } from "@/lib/fonts";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "近畿大学体育会ボクシング部 | Kindai University Boxing Club",
  description:
    "近畿大学体育会ボクシング部の公式ウェブサイト。部員紹介、活動報告、最新情報をお届けします。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${shipporiMincho.variable} ${zenAntique.variable} antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
