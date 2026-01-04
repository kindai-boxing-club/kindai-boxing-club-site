import type { Metadata } from "next";
import Link from "next/link";
import { notoSansJP } from "@/lib/fonts";
import "@/app/(public)/globals.css";

export const metadata: Metadata = {
  title: "管理者画面 | 近畿大学ボクシング部",
  description: "近畿大学ボクシング部 公式サイト 管理システム",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable}  bg-slate-50 text-slate-900 min-h-screen antialiased`}
      >
        <header className="bg-slate-900 border-b-2 border-red-500 py-2 px-6 mb-8 text-white">
          <div className="flex justify-between items-center max-w-6xl mx-auto w-full">
            <h2 className="text-3xl font-black tracking-tight text-white">
              ADMINISTRATION
            </h2>
            <Link
              href="/admin"
              className="text-sm font-bold hover:text-slate-400 transition-colors"
            >
              ← 管理画面トップへ戻る
            </Link>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 pb-12">{children}</main>
      </body>
    </html>
  );
}
