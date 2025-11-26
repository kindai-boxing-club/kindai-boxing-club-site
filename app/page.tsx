import Link from "next/link";

import { fetchMembersFromSheet } from "@/lib/members/fetchMembersFromSheet";
import { SHEET_ID, API_KEY } from "@/config/sheets";
import {
  groupByClassification,
  orderKeys,
  memberClassificationOrder,
  staffClassificationOrder,
  memberClassificationDisplay,
  staffClassificationDisplay,
} from "@/lib/members/grouping";
import MemberSection from "@/components/members/MemberSection";

export default async function Home() {
  // Google Sheetsから部員データとスタッフデータを取得
  const members = await fetchMembersFromSheet(SHEET_ID, API_KEY, "部員");
  const staff = await fetchMembersFromSheet(SHEET_ID, API_KEY, "スタッフ");

  const membersByClassification = groupByClassification(members);
  const staffByClassification = groupByClassification(staff);

  const memberGroupKeys = orderKeys(
    membersByClassification,
    memberClassificationOrder
  );
  const staffGroupKeys = orderKeys(
    staffByClassification,
    staffClassificationOrder
  );

  return (
    <div>
      {/* トップセクション */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/bg_top.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block mb-6 text-8xl animate-pulse">🥊</div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">近畿大学ボクシング部</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-medium">
            情熱と努力で、頂点を目指す
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#members"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-red-600/50"
            >
              部員紹介
            </a>
            <Link
              href="/blog"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 font-bold rounded-lg transition-all transform hover:scale-105 border border-blue-900/30"
            >
              ブログ
            </Link>
          </div>
        </div>
      </section>

      {/* クラブ紹介セクション */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-gradient">クラブ紹介</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-blue-900/20 hover:border-red-500 transition-all shadow-lg">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">強さ</h3>
              <p className="text-gray-700">
                日々の厳しいトレーニングを通じて、心身ともに強くなります。仲間と切磋琢磨し、自分の限界を超えていきます。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-blue-900/20 hover:border-red-500 transition-all shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">絆</h3>
              <p className="text-gray-700">
                部員同士の強い絆が私たちの誇りです。苦楽を共にし、互いに高め合う最高の仲間がここにいます。
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-blue-900/20 hover:border-red-500 transition-all shadow-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">挑戦</h3>
              <p className="text-gray-700">
                全国大会優勝を目標に、常に高い目標に向かって挑戦し続けます。一緒に夢を実現しましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 活動内容セクション */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-gradient">活動内容</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-blue-900/20 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-900 flex items-center">
                <span className="mr-3">📅</span>
                練習日程
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>月〜金: 16:00 - 19:00</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>土曜日: 9:00 - 12:00</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>日曜日: 休み（試合がある場合は出場）</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-blue-900/20 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-900 flex items-center">
                <span className="mr-3">🎯</span>
                年間スケジュール
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>春季: 新歓活動、春季大会</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>夏季: 夏合宿、関東大会</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>秋季: 全日本学生選手権</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">▸</span>
                  <span>冬季: 冬合宿、OB会</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 部員紹介セクション */}
      <MemberSection
        sectionId="members"
        title="部員紹介"
        subtitle="情熱を持って日々トレーニングに励む仲間たち"
        groups={membersByClassification}
        groupKeys={memberGroupKeys}
        displayNames={memberClassificationDisplay}
        fallbackIcon="🥊"
        bgColor="bg-gray-50"
      />

      {/* スタッフ紹介セクション */}
      <MemberSection
        sectionId="staff"
        title="スタッフ紹介"
        subtitle="部員たちを支える指導スタッフ"
        groups={staffByClassification}
        groupKeys={staffGroupKeys}
        displayNames={staffClassificationDisplay}
        fallbackIcon="👔"
        bgColor="bg-white"
      />

      {/* 入部募集CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center bg-white p-12 rounded-xl border border-blue-900/20 shadow-lg">
            <h3 className="text-4xl font-bold mb-6">
              <span className="text-gradient">新入部員募集中！</span>
            </h3>
            <p className="text-xl text-gray-700 mb-8">
              経験者はもちろん、未経験者も大歓迎！
              <br />
              一緒にボクシングで熱い青春を過ごしませんか？
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                Instagram でDM
              </a>
              <Link
                href="/blog"
                className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg transition-all"
              >
                活動記録を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram/SNSセクション */}
      <section className="py-20 px-4 bg-blue-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            最新情報をチェック
          </h2>
          <p className="text-gray-200 mb-8 text-lg">
            日々の活動や試合結果をInstagramで発信中！
          </p>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span>公式Instagramをフォロー</span>
          </a>
        </div>
      </section>
    </div>
  );
}
