import { execute, query } from "./client";
import { Table, Person } from "@/types";

/**
 * IDを指定してメンバーを取得する
 * @param table - テーブル名
 * @param id - メンバーID
 * @returns メンバーデータ、または null
 */
export async function getById(
  table: Table,
  id: number,
): Promise<Person | null> {
  const result = await query<Person>(`SELECT * FROM ${table} WHERE id = ?`, [
    id,
  ]);
  return result.length > 0 ? result[0] : null;
}

/**
 * IDを指定してメンバーを削除扱いにする
 * @param table - テーブル名
 * @param id - メンバーID
 * @returns 削除扱いに成功したかどうか
 */
export async function remove(table: Table, id: number): Promise<boolean> {
  const person = await getById(table, id);
  if (person?.state === "active") {
    return execute(`UPDATE ${table} SET state = 'deleted' WHERE id = ?`, [id]);
  }
  return false;
}

/**
 * IDを指定してメンバーを完全に削除する
 * @param table - テーブル名
 * @param id - メンバーID
 * @returns 削除に成功したかどうか
 */
export async function restore(table: Table, id: number): Promise<boolean> {
  const person = await getById(table, id);
  if (person?.state === "deleted") {
    return execute("DELETE FROM members WHERE id = ?", [id]);
  }
  return false;
}
