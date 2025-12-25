/**
 * ルートレイアウト
 */
import type { Metadata, Viewport } from "next";

import { inter, notoSansJP, shipporiMincho, zenAntique } from "@/lib/fonts";
import "./globals.css";
import Navigation from "@/components/public/layout/Navigation";
import Footer from "@/components/public/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kindai-boxing.com"),
  title: {
    template: "%s | 近畿大学体育会ボクシング部",
    default: "近畿大学体育会ボクシング部 | Kindai University Boxing Club",
  },
  description:
    "近畿大学体育会ボクシング部の公式ウェブサイト。選手紹介、試合日程、活動報告、最新情報をお届けします。",
  openGraph: {
    title: "近畿大学体育会ボクシング部 | Kindai University Boxing Club",
    description:
      "近畿大学体育会ボクシング部の公式ウェブサイト。選手紹介、試合日程、活動報告、最新情報をお届けします。",
    url: "https://kindai-boxing.com",
    siteName: "近畿大学体育会ボクシング部",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "近畿大学体育会ボクシング部",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "近畿大学体育会ボクシング部",
    description:
      "近畿大学体育会ボクシング部の公式ウェブサイト。選手紹介、試合日程、活動報告、最新情報をお届けします。",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${shipporiMincho.variable} ${zenAntique.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
