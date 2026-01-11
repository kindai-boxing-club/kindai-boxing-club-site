import { execute, query } from "./client";
import { Person, PersonInput } from "@/types";

/**
 * メンバー一覧を取得
 *
 * @returns Person型のデータの配列
 */
export async function getMembers(): Promise<Person[]> {
  return await query<Person>(
    "SELECT * FROM members ORDER BY grade, id ASC",
    []
  );
}

/**
 * IDでメンバーを取得
 *
 * @param id - 取得するメンバーのID
 * @returns メンバーのデータ、存在しない場合はnull
 */
export async function getMemberById(id: number): Promise<Person | null> {
  const results = await query<Person>("SELECT * FROM members WHERE id = ?", [
    id,
  ]);
  return results[0] ?? null;
}

/**
 * メンバーを追加
 * IDは自動採番される（AUTOINCREMENT）
 *
 * @param data - 追加するメンバーのデータ（IDなし）
 * @returns 追加に成功したかどうか
 */
export async function createMember(data: PersonInput): Promise<boolean> {
  return execute(
    "INSERT INTO members (name, grade, position, is_manager, faculty, weight_class) VALUES (?, ?, ?, ?, ?, ?)",
    [
      data.name,
      data.grade,
      data.position,
      data.is_manager,
      data.faculty,
      data.weight_class,
    ]
  );
}

/**
 * メンバーを削除
 *
 * @param id - 削除するメンバーのID
 * @returns 削除に成功したかどうか
 */
export async function deleteMember(id: number): Promise<boolean> {
  return execute("DELETE FROM members WHERE id = ?", [id]);
}
