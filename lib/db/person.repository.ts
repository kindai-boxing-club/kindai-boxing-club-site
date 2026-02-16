/**
 * @file lib/db/person.repository.ts
 * @description persons テーブルへのデータアクセス
 *
 * Repository層: SQL実行のみ。ビジネスロジックは含めない。
 */

import { query, execute } from "./client";
import { Person, PersonInput } from "@/types";

/**
 * メンバー一覧を取得
 *
 * @returns Person型のデータの配列
 */
export async function getAll(): Promise<Person[]> {
  const results = await query<Person>(
    "SELECT * FROM members ORDER BY grade, id ASC",
    [],
  );
  return results;
}

/**
 * IDでメンバーを取得
 *
 * @param id - 取得するメンバーのID
 * @returns メンバーのデータ、存在しない場合はnull
 */
export async function getById(id: number): Promise<Person | null> {
  const result = await query<Person>("SELECT * FROM members WHERE id = ?", [
    id,
  ]);
  return result[0] ?? null;
}

/**
 * メンバーを追加
 *
 * @param data - 追加するメンバーのデータ（IDなし）
 * @returns 追加に成功したかどうか
 */
export async function create(data: PersonInput): Promise<boolean> {
  return execute(
    "INSERT INTO members (name, grade, position, is_manager, faculty, weight_class) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.name,
      data.grade,
      data.position,
      data.is_manager,
      data.faculty,
      data.weight_class,
    ],
  );
}

/**
 * メンバーを削除
 *
 * @param id - 削除するメンバーのID
 * @returns 削除に成功したかどうか
 */
export async function remove(id: number): Promise<boolean> {
  return execute("DELETE FROM members WHERE id = ?", [id]);
}
