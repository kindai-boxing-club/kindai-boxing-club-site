/** テーブルのヘッダー行 */

type Props = {
  columns: string[] | readonly string[];
  mode: "view" | "edit" | "delete" | "add";
};

function HeaderCell({ text }: { text: string }) {
  return (
    <th className="px-4 py-3 text-left text-sm font-medium text-black">
      {text}
    </th>
  );
}

export default function TableHeader({ columns, mode }: Props) {
  return (
    <thead className="bg-slate-100">
      <tr>
        {columns.map((col) => (
          <HeaderCell key={col} text={col} />
        ))}
        {mode === "delete" && <HeaderCell text="削除" />}
        {mode === "edit" && <HeaderCell text="編集" />}
        {mode === "add" && <HeaderCell text="削除" />}
      </tr>
    </thead>
  );
}
