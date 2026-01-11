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
  // ========================
  // デバッグログ（問題解決後に削除）
  // ========================
  console.log("🚀 [Server Action] login() が呼び出されました");
  console.log("🔍 [Debug] FormData entries:", [...formData.entries()]);

  // フォームからユーザー名とパスワードを取得
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("🔍 [Debug] username:", username);
  console.log("🔍 [Debug] password length:", password?.length);

  if (!username || !password) {
    console.log("❌ [Debug] 入力値が空");
    return {
      error: "ユーザー名とパスワードを入力してください",
      username: username,
    };
  }

  // 認証処理
  try {
    console.log("🔍 [Debug] verifyCredentials 呼び出し中...");
    const isValid = await verifyCredentials(username, password);
    console.log("🔍 [Debug] verifyCredentials 結果:", isValid);

    if (!isValid) {
      console.log("❌ [Debug] 認証失敗");
      return {
        error: "ユーザー名またはパスワードが間違っています",
        username: username,
      };
    }
  } catch (error) {
    console.error("❌ [Debug] 認証エラー:", error);
    return {
      error: "認証処理中にエラーが発生しました",
      username: username,
    };
  }

  // セッションを作成
  console.log("✅ [Debug] 認証成功、セッション作成中...");
  await createSession(username);

  console.log("🚀 [Debug] リダイレクト: /admin");
  redirect("/admin");
}

/**
 * ログアウト処理
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
