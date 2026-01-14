"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth/verify";
import { createSession, deleteSession } from "@/lib/auth/session";

/**
 * ログイン処理
 *
 * @param prevState - 前回の状態（useActionState用）
 * @param formData - フォームから送信されたデータ
 */
export async function login(
  prevState: { error?: string; username?: string } | null,
  formData: FormData
) {
  console.log("🚀 [Server Action] login() が呼び出されました");

  // フォームからユーザー名とパスワードを取得
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // 入力値のバリデーション
  if (!username || !password) {
    return {
      error: "ユーザー名とパスワードを入力してください",
      username: username,
    };
  }

  // 認証処理
  let isValid = false;
  try {
    isValid = await verifyCredentials(username, password);
  } catch (error) {
    console.error("❌ 認証エラー:", error);
    return {
      error: "認証処理中にエラーが発生しました",
      username: username,
    };
  }

  // 認証失敗
  if (!isValid) {
    return {
      error: "ユーザー名またはパスワードが間違っています",
      username: username,
    };
  }

  // セッションを作成
  console.log("✅ 認証成功、セッション作成中...");
  await createSession(username);

  // 管理画面にリダイレクト
  // 注意: redirect() は try-catch の外で呼び出す必要がある
  console.log("🚀 リダイレクト: /admin");
  // redirect("/admin");
}

/**
 * ログアウト処理
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
