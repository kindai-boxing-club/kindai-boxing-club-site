/**
 * @file components/admin/TableHeader.tsx
 * @description テーブルのヘッダー行
 */

export default function TableHeader({ columns }: { columns: string[] }) {
  return (
    <thead className="bg-slate-100">
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            className="px-4 py-3 text-left text-sm font-medium text-black"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
