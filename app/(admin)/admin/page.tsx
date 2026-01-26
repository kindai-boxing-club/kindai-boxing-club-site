/**
 * @file app/(admin)/admin/page.tsx
 * @description 管理画面ダッシュボード
 *
 * 役割:
 * - 管理画面のトップページを表示
 * - 各機能（メンバー編集・追加・削除）へのナビゲーションカードを提供
 */

import Link from "next/link";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import { FaUserPen, FaUserXmark } from "react-icons/fa6";

function CardButton({
  name,
  icon,
  href,
}: {
  name: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-900 transition-all flex items-center gap-6"
    >
      <div className="p-4 bg-slate-100 rounded-xl transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
      </div>
    </Link>
  );
}

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardButton
          name="メンバー一覧"
          icon={<FaUserFriends size={32} />}
          href="/admin/members"
        />
        <CardButton
          name="メンバー編集"
          icon={<FaUserPen size={32} />}
          href="/admin/members/edit"
        />
        <CardButton
          name="メンバー追加"
          icon={<FaUserPlus size={32} />}
          href="/admin/members/add"
        />
        <CardButton
          name="メンバー削除"
          icon={<FaUserXmark size={32} />}
          href="/admin/members/delete"
        />
      </div>
    </div>
  );
}
