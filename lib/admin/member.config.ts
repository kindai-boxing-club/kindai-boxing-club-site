/**Memberエンティティの設定 */

import { EntityConfig } from "./entity.config";
import { Member } from "@/types";
import {
  MEMBER_GRADES,
  MEMBER_POSITIONS,
  WEIGHT_CLASSES,
  FACULTIES,
} from "../constants";

/** 定数配列から SelectOption[] (value, label) を生成するヘルパー */
function toOptions<T extends string>(
  values: readonly T[],
  format?: (v: T) => string,
) {
  return values.map((v) => ({ value: v, label: format ? format(v) : v }));
}

/**
 * memberエンティティの設定
 *
 * fieldなし→ 表示のみ
 * renderあり→ 表示と編集値の変換
 */
export const memberConfig: EntityConfig<Member> = {
  name: "members",
  label: "メンバー",
  columns: [
    { key: "id", label: "ID" },
    {
      key: "name",
      label: "名前",
      field: { type: "text", placeholder: "名前" },
    },
    {
      key: "grade",
      label: "学年",
      field: { type: "select", options: toOptions(MEMBER_GRADES) },
    },
    {
      key: "position",
      label: "役職",
      field: {
        type: "select",
        options: [{ value: "", label: "なし" }, ...toOptions(MEMBER_POSITIONS)],
      },
      render: (v) => (v ? v : ""),
    },
    {
      key: "weight_class",
      label: "階級",
      field: { type: "select", options: toOptions(WEIGHT_CLASSES) },
      render: (v) => `${v}kg`,
    },
    {
      key: "is_manager",
      label: "マネージャー",
      field: { type: "checkbox" },
      render: (v) => (v ? "マネ" : ""),
    },
    {
      key: "has_experience",
      label: "経験",
      field: { type: "checkbox" },
      render: (v) => (v ? "経験者" : "未経験"),
    },
    {
      key: "state",
      label: "状態",
      render: (v) =>
        v === "active" ? "現役" : v === "graduated" ? "卒業" : "退部",
    },
    {
      key: "faculty",
      label: "学部",
      field: { type: "select", options: toOptions(FACULTIES) },
      render: (v) => (v ? v : ""),
    },
  ],
  defaultValues: {
    name: "",
    grade: "1年",
    position: null,
    weight_class: "50",
    is_manager: 0,
    faculty: null,
    has_experience: false,
  },
};
