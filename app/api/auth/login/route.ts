import { verifyCredentials } from "@/lib/auth/verify";
import { createSession } from "@/lib/auth/session";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    // リクエストボディから username と password を取得
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };
    if (!username || !password)
      return Response.json(
        { error: "ユーザー名とパスワードを入力してください" },
        { status: 400 }
      );

    //認証処理
    const isValid = await verifyCredentials(username, password);
    if (!isValid)
      return Response.json(
        { error: "ユーザー名またはパスワードが間違っています" },
        { status: 401 }
      );

    //セッションを作成
    await createSession(username);
    return Response.json({ success: true });
  } catch (error) {
    console.error("Login error", error);
    return Response.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
