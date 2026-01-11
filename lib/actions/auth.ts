"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/auth/verify";
import { createSession, deleteSession } from "@/lib/auth/session";

/**
 * ログイン処理
 *
 * @param formData - フォームから送信されたデータ
 */
export async function login(formData: FormData) {
  // フォームからユーザー名とパスワードを取得
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  if (!username || !password)
    return { error: "ユーザー名とパスワードを入力してください" };
  // 認証処理
  const isValid = await verifyCredentials(username, password);
  if (!isValid) return { error: "ユーザー名またはパスワードが間違っています" };
  // セッションを作成
  await createSession(username);
  //管理画面にリダイレクト
  redirect("/admin");
}

/**
 * ログアウト処理
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
