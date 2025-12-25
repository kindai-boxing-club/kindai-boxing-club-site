import type { Metadata } from "next";
import Link from "next/link";

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
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-slate-800 text-white p-6 hidden md:block">
            <h1 className="text-xl font-bold mb-8">Admin Console</h1>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link href="/admin" className="hover:text-blue-400">
                    ダッシュボード
                  </Link>
                </li>
                <li>
                  <Link href="/admin/members" className="hover:text-blue-400">
                    メンバー管理
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-400 text-sm opacity-50"
                  >
                    ← サイトを確認
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
