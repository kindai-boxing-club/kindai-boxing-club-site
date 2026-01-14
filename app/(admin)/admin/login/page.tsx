"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // フォーム送信ハンドラを作成
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // デフォルトの送信を防ぐ
    e.preventDefault();
    //フォームデータを取得
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    //  API を呼び出す
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    // レスポンスを処理
    const data = (await res.json()) as { success?: boolean; error?: string };
    if (data.success) router.push("/admin");
    else if (data.error) setError(data.error);
  }
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">管理者ログイン</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <input
              className="border border-gray-300 rounded p-2"
              name="username"
              type="text"
              placeholder="username"
              required
            />
            <input
              className="border border-gray-300 rounded p-2"
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              ログイン
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
