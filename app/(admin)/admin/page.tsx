export default function AdminPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">ダッシュボード</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            総メンバー数
          </h3>
          <p className="text-3xl font-bold">52名</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            未更新プロフィール
          </h3>
          <p className="text-3xl font-bold text-orange-500">5件</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-2">
            今月のブログ更新
          </h3>
          <p className="text-3xl font-bold">12件</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold mb-4">最近の更新</h3>
        <p className="text-slate-500 text-sm italic">準備中...</p>
      </div>
    </div>
  );
}
