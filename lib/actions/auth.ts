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
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return {
      error: "ユーザー名とパスワードを入力してください",
      username: username,
    };
  }

  const isValid = await verifyCredentials(username, password);
  if (!isValid) {
    return {
      error: "ユーザー名またはパスワードが間違っています",
      username: username,
    };
  }

  await createSession(username);
  redirect("/admin");
}

/**
 * ログアウト処理
 */
export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
