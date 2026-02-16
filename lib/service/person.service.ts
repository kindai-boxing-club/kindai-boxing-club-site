/**
 * @file lib/service/person.service.ts
 * @description メンバーに関するビジネスロジック
 *
 * Service層: ドメインロジックとデータアクセスを仲介する
 */

import * as personRepository from "@/lib/db/person.repository";
import { MOCK_MEMBERS } from "@/lib/db/person.mock";
import {
  MEMBER_GRADE_ORDER,
  TeamCollection,
} from "@/lib/domain/TeamCollection";
import { Person, PersonInput } from "@/types";

/**
 * 学年別にメンバーを取得
 *
 * @returns 学年別にグループ化されたメンバーのデータ
 */
export async function getMembersByGrade(): Promise<{
  groups: Record<string, Person[]>;
  groupKeys: string[];
}> {
  let members = await personRepository.findAll();
  if (members.length === 0) members = MOCK_MEMBERS;
  const collection = new TeamCollection(members).sortDefault();
  const groups = collection.groupByGrade();
  const groupKeys = TeamCollection.getSortedGroupKeys(
    groups,
    MEMBER_GRADE_ORDER,
  );
  return { groups, groupKeys };
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
