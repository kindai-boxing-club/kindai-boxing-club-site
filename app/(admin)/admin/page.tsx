import Link from "next/link";
import { FaUsers } from "react-icons/fa";

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/members"
          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-900 transition-all flex items-center gap-6"
        >
          <div className="p-4 bg-slate-100 rounded-xl transition-colors">
            <FaUsers size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">メンバー管理</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
