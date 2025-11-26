import { blogPosts } from "@/lib/blog/data";
import { notFound } from "next/navigation";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    イベント: "bg-blue-600",
    練習: "bg-green-600",
    合宿: "bg-purple-600",
    試合: "bg-red-600",
  };

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* 記事ヘッダー */}
      <article className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-red-600 hover:text-red-500 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          ブログ一覧に戻る
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span
                className={`px-3 py-1 ${
                  categoryColors[post.category] || "bg-gray-600"
                } text-white text-sm font-bold rounded-full`}
              >
                {post.category}
              </span>
            )}
            <time className="text-gray-500">
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
            {post.title}
          </h1>

          <p className="text-gray-600">投稿者: {post.author}</p>
        </div>

        {/* アイキャッチ画像 */}
        <div className="mb-12 h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center border border-blue-900/20">
          <span className="text-8xl">📝</span>
        </div>

        {/* 記事本文 */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* SNSシェアボタン（将来的に実装） */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            この記事をシェア
          </h3>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Twitter
            </button>
            <button className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors">
              Facebook
            </button>
          </div>
        </div>
      </article>

      {/* 関連記事 */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <span className="text-gradient">他の記事</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white border border-blue-900/20 rounded-xl overflow-hidden hover:border-red-500 transition-all hover:transform hover:scale-105 shadow-lg"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-5xl">📝</span>
                  </div>
                  <div className="p-4">
                    {relatedPost.category && (
                      <span
                        className={`inline-block px-2 py-1 ${
                          categoryColors[relatedPost.category] || "bg-gray-600"
                        } text-white text-xs font-bold rounded-full mb-2`}
                      >
                        {relatedPost.category}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <time className="text-sm text-gray-500">
                      {new Date(relatedPost.date).toLocaleDateString("ja-JP")}
                    </time>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
