/**
 * @file lib/service/person.service.ts
 * @description メンバーに関するビジネスロジック
 *
 * Service層: ドメインロジックとデータアクセスを仲介する
 */

import * as personRepository from "@/lib/db/person.repository";
import { MOCK_MEMBERS } from "@/lib/db/person.mock";

import { Person, PersonInput, GroupedPerson } from "@/types";

const MEMBER_GRADE_ORDER = ["マネージャー", "4年", "3年", "2年", "1年", "院生"];

// const STAFF_GRADE_ORDER = ["部長", "総監督", "監督", "コーチ"];

/**
 * 全メンバーを取得 (役職順、学年順、ID順)
 *
 * @returns 全メンバーのデータ
 */
export async function getMembers(): Promise<Person[]> {
  let members = await personRepository.getAll();
  if (members.length === 0) members = MOCK_MEMBERS;

  return members;
}

/**
 * 学年順の全メンバーをグループ化して取得
 *
 * @returns 学年順の全メンバーのデータ
 */
export async function getGroupedMembers(): Promise<GroupedPerson[]> {
  const members = await getMembers();

  //グループ分けする
  const groupMap: Record<string, Person[]> = {};
  for (const person of members) {
    const key = person.is_manager === 1 ? "マネージャー" : person.grade.trim();
    if (!groupMap[key]) groupMap[key] = [];
    groupMap[key].push(person);
  }

  // keyを並び替える
  return MEMBER_GRADE_ORDER.filter((key) => groupMap[key]?.length).map(
    (key) => ({ label: key, persons: groupMap[key] }),
  );
}

/**
 * メンバーを追加
 *
 * @param data - 追加するメンバーのデータ
 * @returns 追加に成功したかどうか
 */
export async function addMember(data: PersonInput): Promise<boolean> {
  return personRepository.create(data);
}

/**
 * メンバーを削除
 *
 * @param id - 削除するメンバーのID
 * @returns 削除に成功したかどうか
 */
export async function deleteMember(id: number): Promise<boolean> {
  return personRepository.remove(id);
}
