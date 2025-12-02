/**
 * 部員グルーピングモジュール
 * 取得した部員データを分類（学年、役職など）ごとにグループ化し、
 * 表示順序を制御するためのユーティリティ関数を提供する。
 */
import type { Member } from "@/types";

const DEFAULT_CLASSIFICATION = "未分類";

/**
 * 分類ごとにグループ化する
 */
export const groupByClassification = (people: Member[]) =>
  people.reduce<Record<string, Member[]>>((acc, person) => {
    const key = person.classification?.trim() || DEFAULT_CLASSIFICATION;
    if (!acc[key]) acc[key] = [];
    acc[key].push(person);
    return acc;
  }, {});

/**
 * グループのキーを優先順位に従って並び替える
 */
export const orderKeys = (
  groups: Record<string, Member[]>,
  preferredOrder: string[]
) => [
  ...preferredOrder.filter((classification) => groups[classification]?.length),
  ...Object.keys(groups)
    .filter(
      (classification) =>
        !preferredOrder.includes(classification) &&
        groups[classification]?.length
    )
    .sort((a, b) => a.localeCompare(b, "ja")),
];

export {
  memberClassificationOrder,
  staffClassificationOrder,
  memberClassificationDisplay,
  staffClassificationDisplay,
} from "@/lib/config/constants";
