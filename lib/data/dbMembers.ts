import type {
  D1Database,
  D1PreparedStatement,
} from "@cloudflare/workers-types";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { Person } from "@/types";
import { MOCK_MEMBERS } from "./mockMembers";

// DBアクセサ
export async function getMembersFromD1(db: D1Database): Promise<Person[]> {
  try {
    const { results } = await db
      .prepare("SELECT * FROM members ORDER BY id ASC")
      .all<Person>();

    return results;
  } catch (e) {
    console.error("Failed to fetch members from D1:", e);
    return [];
  }
}

/**
 * 環境に応じてD1またはモックデータからメンバーを取得する
 * (Server Component / API Route 両用)
 */
export async function getMembers(): Promise<Person[]> {
  try {
    // 1. Cloudflare D1 (Edge Runtime) からの取得を試みる
    try {
      const { env } = getRequestContext();
      if (env && env.DB) {
        return await getMembersFromD1(env.DB);
      }
    } catch {
      // getRequestContextが動作しない環境（Node.jsなど）では無視して次へ
    }

    // 2. フォールバック: モックデータを返す
    // ローカル開発やビルド時など、D1にアクセスできない場合
    console.warn("Database binding not found. Using mock data.");
    return MOCK_MEMBERS;
  } catch (error) {
    console.error("Error in getMembers:", error);
    return MOCK_MEMBERS;
  }
}

/**
 * SQL命令をまとめて実行する
 */
export async function executeBatch(statements: D1PreparedStatement[]) {
  const { env } = getRequestContext();
  if (!env?.DB) throw new Error("Database binding not found");

  try {
    return await env.DB.batch(statements);
  } catch (e) {
    console.error("Failed to execute batch:");
    throw e;
  }
}
