/**
 * 部員グルーピングモジュール
 * 取得した部員データを分類（学年、役職など）ごとにグループ化し、
 * 表示順序を制御するためのユーティリティ関数を提供する。
 */
import type { Person } from "@/types";

const DEFAULT_GRADE = "未分類";

/**
 * 分類ごとにグループ化する
 */
export const groupByGrade = (people: Person[]) =>
  people.reduce<Record<string, Person[]>>((acc, person) => {
    const key = person.grade?.trim() || DEFAULT_GRADE;
    if (!acc[key]) acc[key] = [];
    acc[key].push(person);
    return acc;
  }, {});

/**
 * グループのキーを優先順位に従って並び替える
 */
export const orderKeys = (
  groups: Record<string, Person[]>,
  preferredOrder: string[]
) => [
  ...preferredOrder.filter((grade) => groups[grade]?.length),
  ...Object.keys(groups)
    .filter((grade) => !preferredOrder.includes(grade) && groups[grade]?.length)
    .sort((a, b) => a.localeCompare(b, "ja")),
];

/**
 * 部員の分類順序
 */
export const memberGradeOrder = [
  "マネージャー",
  "4年",
  "3年",
  "2年",
  "1年",
  "修士1年",
  "修士2年",
  "博士1年",
  "博士2年",
];

/**
 * スタッフの分類順序
 */
export const staffGradeOrder = ["部長", "総監督", "監督", "コーチ"];
