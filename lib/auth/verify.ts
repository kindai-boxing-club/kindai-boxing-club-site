import bcrypt from "bcryptjs";

/**
 * ユーザー名とパスワードを検証する
 *
 * @param username - 入力されたユーザー名
 * @param password - 入力されたパスワード（平文）
 * @returns 認証成功ならtrue、失敗ならfalse
 */
export async function verifyCredentials(
  username: string,
  password: string
): Promise<boolean> {
  // 環境変数からユーザー名とパスワードハッシュを取得
  const envUsername = process.env.ADMIN_USER_1_USERNAME;
  const envPasswordHash = process.env.ADMIN_USER_1_PASSWORD_HASH;

  if (!envUsername || !envPasswordHash)
    throw new Error("Admin credentials not configured");

  // ユーザー名が一致するかチェック
  if (username !== envUsername) return false;

  // パスワードをハッシュと比較
  return await bcrypt.compare(password, envPasswordHash);
}
