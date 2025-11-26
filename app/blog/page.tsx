import { blogPosts } from "@/lib/blog/data";
import Link from "next/link";

export default function BlogPage() {
  // カテゴリーごとの色
  const categoryColors: Record<string, string> = {
    イベント: "bg-blue-600",
    練習: "bg-green-600",
    合宿: "bg-purple-600",
    試合: "bg-red-600",
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* ヘッダー */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 boxing-pattern">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white">
            活動ブログ
          </h1>
          <p className="text-xl text-gray-200">
            日々の練習や試合、イベントの様子をお届けします
          </p>
        </div>
      </section>

      {/* ブログ一覧 */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white border border-blue-900/20 rounded-xl overflow-hidden hover:border-red-500 transition-all hover:transform hover:scale-[1.02] shadow-lg"
              >
                <div className="md:flex">
                  {/* 画像エリア */}
                  <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>

                  {/* コンテンツエリア */}
                  <div className="md:w-2/3 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span
                          className={`px-3 py-1 ${
                            categoryColors[post.category] || "bg-gray-600"
                          } text-white text-sm font-bold rounded-full`}
                        >
                          {post.category}
                        </span>
                      )}
                      <time className="text-gray-500 text-sm">
                        {new Date(post.date).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3 hover:text-red-600 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        投稿者: {post.author}
                      </span>
                      <span className="text-red-600 font-semibold flex items-center">
                        続きを読む
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ページネーション（将来的に実装） */}
          {blogPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">まだ投稿がありません</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
