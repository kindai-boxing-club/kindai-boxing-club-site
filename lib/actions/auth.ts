"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth/verify";
import { createSession, deleteSession } from "@/lib/auth/session";

/**
 * ログイン処理
 *
 * @param formData - フォームから送信されたデータ
 */
export async function login(
  prevState: { error?: string; username?: string } | null,
  formData: FormData
) {
  // フォームからユーザー名とパスワードを取得
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  if (!username || !password)
    return {
      error: "ユーザー名とパスワードを入力してください",
      username: username,
    };

  // 認証処理
  try {
    const isValid = await verifyCredentials(username, password);
    if (!isValid)
      return {
        error: "ユーザー名またはパスワードが間違っています",
        username: username,
      };
  } catch (error) {
    console.error("認証エラー:", error);
    return {
      error: "認証処理中にエラーが発生しました",
      username: username,
    };
  }

  // セッションを作成
  await createSession(username);
  // 管理画面にリダイレクト
  redirect("/admin");
}

/**
 * ログアウト処理
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
