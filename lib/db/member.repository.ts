/** メンバーテーブルへのデータアクセス */

import { query, execute } from "./client";
import { MemberInput, Member } from "@/types";

/**
 * activeなメンバー一覧を取得
 *
 * @returns Member型のデータの配列
 */
export async function getAllActive(): Promise<Member[]> {
  return query<Member>(
    `SELECT * FROM members WHERE state = 'active' ORDER BY
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
}

/**
 * メンバーを追加
 *
 * @param data - 追加するメンバーのデータ（IDなし）
 * @returns 追加に成功したかどうか
 */
export async function create(data: MemberInput): Promise<boolean> {
  return execute(
    "INSERT INTO members (name, grade, position, is_manager, faculty, weight_class, state, has_experience) VALUES (?, ?, ?, ?, ?, ?, 'active', ?)",
    [
      data.name,
      data.grade,
      data.position,
      data.is_manager,
      data.faculty,
      data.weight_class,
      data.has_experience,
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
  return execute("UPDATE members SET state = 'deleted' WHERE id = ?", [id]);
}

/**
 * メンバーを完全に削除
 *
 * @param id - 削除するメンバーのID
 * @returns 削除に成功したかどうか
 */
export async function eliminate(id: number): Promise<boolean> {
  return execute("DELETE FROM members WHERE id = ?", [id]);
}
