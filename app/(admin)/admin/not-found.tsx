import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-800">
      <FaExclamationTriangle className="text-red-500 mb-4" size={64} />
      <h2 className="text-3xl font-black mb-2">404 - Not Found</h2>
      <p className="text-lg text-slate-600 mb-8">お探しのページは見つかりませんでした。</p>
      <Link 
        href="/admin" 
        className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
      >
        管理画面トップへ戻る
      </Link>
    </div>
  );
}
