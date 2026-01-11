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
  prevState: { error?: string } | null,
  formData: FormData
) {
  // フォームからユーザー名とパスワードを取得
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  if (!username || !password) {
    console.log("入力値が空");
    return {
      error: "ユーザー名とパスワードを入力してください",
      username: username,
    };
  }
  // 認証処理
  const isValid = await verifyCredentials(username, password);
  console.log("認証結果: " + isValid);
  if (!isValid) {
    console.log("認証失敗");
    return {
      error: "ユーザー名またはパスワードが間違っています",
      username: username,
    };
  }
  // セッションを作成
  console.log("認証成功、セッション作成");
  await createSession(username);
  //管理画面にリダイレクト
  console.log("redirect: /admin");
  redirect("/admin");
}

/**
 * ログアウト処理
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
