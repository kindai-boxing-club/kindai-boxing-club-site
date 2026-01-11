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

  // デバッグ用（本番では削除）
  console.log("ENV Check:", {
    hasUsername: !!envUsername,
    hasHash: !!envPasswordHash,
    hashLength: envPasswordHash?.length,
  });

  if (!envUsername || !envPasswordHash) {
    console.error("Admin credentials not configured", {
      envUsername: envUsername ? "set" : "missing",
      envPasswordHash: envPasswordHash ? "set" : "missing",
    });
    return false; // throw ではなく false を返す
  }

  // ユーザー名が一致するかチェック
  if (username !== envUsername) return false;

  // パスワードをハッシュと比較
  try {
    return await bcrypt.compare(password, envPasswordHash);
  } catch (error) {
    console.error("bcrypt compare error:", error);
    return false;
  }
}
