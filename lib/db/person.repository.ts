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
    `SELECT * FROM members ORDER BY
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
      id ASC`,
    [],
  );
  return results;
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
