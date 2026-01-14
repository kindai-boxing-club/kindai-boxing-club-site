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
  const envUsername = process.env.ADMIN_USER_1_USERNAME;
  const envPasswordHash = process.env.ADMIN_USER_1_PASSWORD_HASH;

  if (!envUsername || !envPasswordHash) {
    console.error("Admin credentials not configured");
    return false;
  }

  if (username !== envUsername) return false;

  try {
    return await bcrypt.compare(password, envPasswordHash);
  } catch (error) {
    console.error("bcrypt compare error:", error);
    return false;
  }
}
