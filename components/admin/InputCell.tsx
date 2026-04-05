/**
 * InputCell — フィールド定義に基づいて入力UIを動的に生成するコンポーネント
 *
 * EntityConfig の ColumnDef.field.type に応じて
 * text → <input>, select → <select>, checkbox → <input type="checkbox">
 * を描画する。PersonTable のセル描画ロジックの分離先。
 */

import { FieldDef } from "@/lib/admin/entity.config";

type Props = {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
};

export default function InputCell({ field, value, onChange }: Props) {
  switch (field.type) {
    case "text":
      return (
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "select":
      return (
        <select
          className="w-full border rounded px-2 py-1"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value || null)}
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    case "checkbox":
      return (
        <input
          type="checkbox"
          className="w-5 h-5"
          checked={value === 1 || value === true}
          onChange={(e) => onChange(e.target.checked ? 1 : 0)}
        />
      );
  }
}
