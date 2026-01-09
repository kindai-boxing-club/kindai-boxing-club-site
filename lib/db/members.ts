import { execute, query } from "./client";
import { Person, PersonInput } from "@/types";

/**
 * D1から取得した生データをPerson型に変換
 *
 * @param raw - D1から取得した生データ（is_managerが0 or 1）
 * @returns Person型のデータ（is_managerがtrue or false）
 */
function mapToPerson(raw: any): Person {
  return {
    ...raw,
    is_manager: raw.is_manager === 1,
  };
}

/**
 * PersonInput型をDB用の形式に変換
 *
 * @param person - PersonInput型のデータ
 * @returns DB用の形式のデータ
 */
function mapToDb(person: PersonInput): any {
  return {
    ...person,
    is_manager: person.is_manager ? 1 : 0,
  };
}

/**
 * メンバー一覧を取得
 *
 * @returns Person型のデータの配列
 */
export async function getMembers() {
  const members = await query<Person>(
    "SELECT * FROM members ORDER BY grade, id ASC",
    []
  );
  return members.map(mapToPerson);
}

/**
 * IDでメンバーを取得
 *
 * @param id - 取得するメンバーのID
 * @returns メンバーのデータ、存在しない場合はnull
 */
export async function getMemberById(id: number): Promise<Person | null> {
  const results = await query<any>("SELECT * FROM members WHERE id = ?", [id]);

  return results[0] ? mapToPerson(results[0]) : null;
}

/**
 * メンバーを追加
 * IDは自動採番される（AUTOINCREMENT）
 *
 * @param data - 追加するメンバーのデータ（IDなし）
 * @returns 追加に成功したかどうか
 */
export async function createMember(data: PersonInput): Promise<boolean> {
  const dbData = mapToDb(data);
  return execute(
    "INSERT INTO members (name, grade, position, is_manager, faculty, weight_class) VALUES (?, ?, ?, ?, ?, ?)",
    [
      dbData.name,
      dbData.grade,
      dbData.position,
      dbData.is_manager,
      dbData.faculty,
      dbData.weight_class,
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
