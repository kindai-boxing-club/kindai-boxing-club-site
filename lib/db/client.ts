/**
 * @file lib/db/client.ts
 * @description D1 データベースへの低レベルアクセスを提供するクライアント層
 *
 * このファイルの役割:
 * - Cloudflare D1 への接続を確立する
 * - SQL クエリ（SELECT）を実行して結果を返す
 * - SQL コマンド（INSERT/UPDATE/DELETE）を実行する
 *
 * 使用例:
 *   import { query } from "@/lib/db/client";
 *   const users = await query<User>("SELECT * FROM users");
 */

import type { D1Database } from "@cloudflare/workers-types";
import { getRequestContext } from "@cloudflare/next-on-pages";

/**
 * SQLクエリのパラメータとして使用できる型
 */
type QueryParam = string | number | boolean | null;

/**
 * D1データベースのインスタンスを取得する
 *
 * @returns D1Database または null（接続できない場合）
 */
export function getDB(): D1Database | null {
  try {
    /// getRequestContext() を使って、環境変数を取得
    const { env } = getRequestContext();
    return env.DB ? env.DB : null;
  } catch (error) {
    // getRequestContext が使えない環境（ローカル開発など）
    console.warn("Database connection not available:", error);
    return null;
  }
}

/**
 * SQLクエリ(SELECT)を実行して結果を取得する
 *
 * @param sql - 実行するSQL文（例: "SELECT * FROM members"）
 * @param params - バインドするパラメータ（例: ["太郎", 3]）
 * @returns クエリ結果の配列
 */
export async function query<T>(
  sql: string,
  params: QueryParam[] = [],
): Promise<T[]> {
  const db = getDB();
  if (!db) return [];

  try {
    /// SQLクエリを実行
    const result = await db
      .prepare(sql)
      .bind(...params)
      .all<T>();
    return result.results;
  } catch (error) {
    console.error("Query execution failed:", error);
    return [];
  }
}
/**
 * SQLクエリ(INSERT/UPDATE/DELETE)を実行して結果を取得する
 *
 * @param sql - 実行するSQL文（例: "INSERT INTO members (name, age) VALUES (?, ?)"）
 * @param params - バインドするパラメータ（例: ["太郎", 3]）
 * @returns クエリ結果の配列
 */
export async function execute(
  sql: string,
  params: QueryParam[] = [],
): Promise<boolean> {
  const db = getDB();
  if (!db) return false;

  try {
    /// SQLクエリを実行
    const result = await db
      .prepare(sql)
      .bind(...params)
      .run();
    return result.success;
  } catch (error) {
    console.error("Execute failed:", error);
    return false;
  }
}
