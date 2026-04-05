/** Staffエンティティの設定 */

import { EntityConfig } from "./entity.config";
import { Staff } from "@/types";
import { STAFF_GRADES } from "../constants";

function toOptions<T extends string>(
  values: readonly T[],
  format?: (v: T) => string,
) {
  return values.map((v) => ({ value: v, label: format ? format(v) : v }));
}

export const staffConfig: EntityConfig<Staff> = {
  name: "staff",
  label: "スタッフ",
  columns: [
    { key: "id", label: "ID" },
    {
      key: "name",
      label: "名前",
      field: { type: "text", placeholder: "名前" },
    },
    {
      key: "grade",
      label: "役職",
      field: { type: "select", options: toOptions(STAFF_GRADES) },
    },
    {
      key: "bio",
      label: "略歴",
      field: { type: "text", placeholder: "略歴" },
      render: (v) => (v ? v : "未登録"),
    },
    {
      key: "state",
      label: "状態",
      render: (v) => (v === "active" ? "現役" : "退勤"),
    },
  ],
  defaultValues: {
    name: "",
    grade: "コーチ",
    position: "コーチ",
    bio: "",
  },
};
