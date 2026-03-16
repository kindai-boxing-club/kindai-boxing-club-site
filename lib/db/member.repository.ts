/** メンバーテーブルへのデータアクセス */

import { query, execute } from "./client";
import { MemberInput, Member } from "@/types";
import {
  restore as restorePerson,
  remove as removePerson,
  getById as getPersonById,
  eliminate as eliminatePerson,
} from "./person.repository";

const TABLE = "members";

export const get = (id: number) => getPersonById(TABLE, id);
export const remove = (id: number) => removePerson(TABLE, id);
export const restore = (id: number) => restorePerson(TABLE, id);
export const eliminate = (id: number) => eliminatePerson(TABLE, id);

/**
 * すべてのactiveなメンバー一覧を取得
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
 * メンバー情報を更新
 *
 * @param id - 更新対象のメンバーID
 * @param data - 更新するデータ
 * @returns 更新に成功したかどうか
 */
export async function update(id: number, data: MemberInput): Promise<boolean> {
  return execute(
    `UPDATE members SET name = ?, grade = ?, position = ?, is_manager = ?, faculty = ?, weight_class = ?, has_experience = ? WHERE id = ?`,
    [
      data.name,
      data.grade,
      data.position,
      data.is_manager,
      data.faculty,
      data.weight_class,
      data.has_experience,
      id,
    ],
  );
}
