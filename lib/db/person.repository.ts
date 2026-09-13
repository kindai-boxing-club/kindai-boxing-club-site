import { execute, query, batchQuery } from "./client";
import { Table, Person, Member, Staff } from "@/types";

const PUBLIC_MEMBERS_SQL = `SELECT * FROM members WHERE state = 'active' ORDER BY
  CASE grade
    WHEN '4年' THEN 1
    WHEN '3年' THEN 2
    WHEN '2年' THEN 3
    WHEN '1年' THEN 4
    WHEN '院生' THEN 5
    ELSE 99
  END,
  CASE position
    WHEN '主将' THEN 1
    WHEN '副将' THEN 2
    WHEN '主務' THEN 3
    WHEN '会計' THEN 4
    ELSE 99
  END,
  id ASC`;
const PUBLIC_STAFF_SQL =
  "SELECT * FROM staff WHERE state = 'active' ORDER BY id ASC";

export async function getPublicData(): Promise<[Member[], Staff[]]> {
  return batchQuery<[Member[], Staff[]]>([
    { sql: PUBLIC_MEMBERS_SQL },
    { sql: PUBLIC_STAFF_SQL },
  ]);
}

/**
 * IDを指定してPersonを取得する
 * @param table - テーブル名
 * @param id - メンバーID
 * @returns Personデータ、または null
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
 * IDを指定してPersonを削除扱いにする
 * @param table - テーブル名
 * @param id - Person ID
 * @returns 削除扱いに成功したかどうか
 */
export async function remove(table: Table, id: number): Promise<boolean> {
  const person = await getById(table, id);
  if (person?.state === "active")
    return execute(`UPDATE ${table} SET state = 'deleted' WHERE id = ?`, [id]);
  return false;
}

/**
 * IDを指定してPersonを復元する
 * @param table - テーブル名
 * @param id - Person ID
 * @returns 復元に成功したかどうか
 */
export async function restore(table: Table, id: number): Promise<boolean> {
  const person = await getById(table, id);
  if (person?.state === "deleted")
    return execute(`UPDATE ${table} SET state = 'active' WHERE id = ?`, [id]);
  return false;
}

/**
 * IDを指定してPersonを完全に削除する
 * @param table - テーブル名
 * @param id - Person ID
 * @returns 削除に成功したかどうか
 */
export async function eliminate(table: Table, id: number): Promise<boolean> {
  const person = await getById(table, id);
  if (person?.state === "deleted")
    return execute(`DELETE FROM ${table} WHERE id = ?`, [id]);
  return false;
}
