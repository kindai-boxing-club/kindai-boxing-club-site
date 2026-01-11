import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

// セッションの有効期限（24時間）
const SESSION_DURATION = 24 * 60 * 60 * 1000;

/**
 * セッションのペイロード（トークンに含める情報）
 */
type SessionPayload = {
  username: string;
  authenticated: boolean;
};

/**
 * 秘密鍵を取得
 */
function getSecretKey(): Uint8Array {
  const secretKey = process.env.AUTH_SECRET;
  if (!secretKey) throw new Error("AUTH_SECRET is not set");
  // バイト配列に変換
  return new TextEncoder().encode(secretKey);
}

/**
 * セッションを作成してCookieに保存
 */
export async function createSession(username: string): Promise<void> {
  const secret = getSecretKey();
  // JWTを作成
  const token = await new SignJWT({ username, authenticated: true })
    .setProtectedHeader({ alg: "HS256" }) //署名アルゴリズムを設定 HMAC-SHA256
    .setIssuedAt() //発行日時を記録
    .setExpirationTime("24h") //有効期限を設定
    .sign(secret); //秘密鍵で署名

  (await cookies()).set("session", token, {
    httpOnly: true, //JavaScriptからアクセス不可（XSS対策）
    secure: process.env.NODE_ENV === "production", //本番環境ではHTTPSのみ
    sameSite: "lax", //CSRF対策
    maxAge: SESSION_DURATION / 1000, //有効期限（秒単位）
    path: "/", //すべてのパスで有効
  });
}

/**
 * セッションを検証
 */
export async function verifySession(): Promise<SessionPayload | null> {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  const secret = getSecretKey();
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * セッションを削除（ログアウト）
 */
export async function deleteSession(): Promise<void> {
  (await cookies()).delete("session");
}
