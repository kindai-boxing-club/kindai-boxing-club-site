/** 部活統計セクション（Server Component） */

import { getMembers } from "@/lib/service/person.service";
import type { Person, MemberGrade } from "@/types";
import SectionHeading from "@/components/public/ui/SectionHeading";

/** 経験者数（DBにカラムがないためハードコード） */
const EXPERIENCED_COUNT = 6;

/** 学年グループの色 */
const GRADE_COLORS: Record<string, string> = {
  "4年": "#dc2626",
  "3年": "#f97316",
  "2年": "#eab308",
  "1年": "#22c55e",
  院生: "#6366f1",
};

/** 学年の順序 */
const GRADE_ORDER: MemberGrade[] = ["4年", "3年", "2年", "1年", "院生"];

function countByField(members: Person[], field: "grade" | "faculty") {
  const counts: Record<string, number> = {};
  for (const m of members) {
    const key = m[field] ?? "不明";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

/** カード共通ラッパー */
function StatCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}

/** 未経験者率カード */
function ExperienceRate({ total }: { total: number }) {
  const inexperienced = total - EXPERIENCED_COUNT;
  const inexperiencedPct = Math.round((inexperienced / total) * 100);
  const gradient = `conic-gradient(#dc2626 0% ${inexperiencedPct}%, #e5e7eb ${inexperiencedPct}% 100%)`;

  return (
    <StatCard title="未経験者率">
      <div className="flex flex-col items-center py-4">
        <div
          className="w-36 h-36 rounded-full shadow-inner mb-4 flex items-center justify-center"
          style={{ background: gradient }}
        >
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
            <span className="text-3xl font-black text-red-600">
              {inexperiencedPct}%
            </span>
          </div>
        </div>
        <div className="flex gap-4 text-sm mt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
            <span className="text-gray-700">未経験 {inexperienced}人</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
            <span className="text-gray-700">経験者 {EXPERIENCED_COUNT}人</span>
          </div>
        </div>
      </div>
    </StatCard>
  );
}

/** 学年別の円グラフカード */
function GradeChart({
  gradeCounts,
  total,
}: {
  gradeCounts: Record<string, number>;
  total: number;
}) {
  let cumulative = 0;
  const segments: string[] = [];
  const legend: { grade: string; count: number; color: string; pct: number }[] =
    [];
  /** セグメントラベルの位置情報 */
  const labels: { grade: string; count: number; x: number; y: number }[] = [];

  const CHART_SIZE = 144; // w-36 = 9rem = 144px
  const LABEL_RADIUS = (CHART_SIZE / 2) * 0.75; // ドーナツの色部分の中央

  for (const grade of GRADE_ORDER) {
    const count = gradeCounts[grade] || 0;
    if (count === 0) continue;
    const pct = (count / total) * 100;
    const color = GRADE_COLORS[grade] || "#9ca3af";
    segments.push(`${color} ${cumulative}% ${cumulative + pct}%`);
    legend.push({ grade, count, color, pct: Math.round(pct) });

    // セグメント中間角度（12時起点、時計回り）→ ラベル座標を計算
    const midPct = cumulative + pct / 2;
    const midAngle = (midPct / 100) * 2 * Math.PI - Math.PI / 2;
    labels.push({
      grade,
      count,
      x: Math.cos(midAngle) * LABEL_RADIUS,
      y: Math.sin(midAngle) * LABEL_RADIUS,
    });

    cumulative += pct;
  }

  const gradient = `conic-gradient(${segments.join(", ")})`;

  return (
    <StatCard title="学年の割合">
      <div className="flex flex-col items-center py-4">
        {/* 円グラフ（セグメント上にラベル） */}
        <div
          className="relative w-36 h-36 rounded-full shadow-inner mb-4"
          style={{ background: gradient }}
        >
          {/* 中央の白い穴 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white" />
          </div>
          {/* セグメントラベル */}
          {labels.map((label) => (
            <span
              key={label.grade}
              className="absolute text-[11px] font-bold text-white drop-shadow-md"
              style={{
                left: `calc(50% + ${label.x}px)`,
                top: `calc(50% + ${label.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {label.count}
            </span>
          ))}
        </div>
        {/* 凡例 */}
        <div className="flex gap-4 text-sm mt-2">
          {legend.map((item) => (
            <div key={item.grade} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700">{item.grade}</span>
            </div>
          ))}
        </div>
      </div>
    </StatCard>
  );
}

/** 学部別の横棒グラフカード */
function FacultyChart({
  facultyCounts,
}: {
  facultyCounts: Record<string, number>;
}) {
  const sorted = Object.entries(facultyCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = sorted[0]?.[1] || 1;

  return (
    <StatCard title="所属学部">
      <div className="space-y-2.5">
        {sorted.map(([faculty, count]) => {
          const widthPct = (count / maxCount) * 100;
          return (
            <div key={faculty} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-24 shrink-0 text-right">
                {faculty}
              </span>
              <div className="flex-1 flex items-center">
                <div
                  className="h-6 bg-red-600 rounded-sm"
                  style={{ width: `${widthPct}%` }}
                />
                <span className="text-sm font-bold text-gray-700 ml-2">
                  {count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </StatCard>
  );
}

export default async function DataSection() {
  const members = await getMembers();

  const studentGrades = ["1年", "2年", "3年", "4年", "院生"];
  const students = members.filter((m) => studentGrades.includes(m.grade));
  const total = students.length;

  if (total === 0) return null;

  const gradeCounts = countByField(students, "grade");
  const facultyCounts = countByField(students, "faculty");

  return (
    <section className="py-16 px-4 bg-gray-50">
      <SectionHeading title="DATA" subtitle="部員データ" />
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {/* 上段: 学部（全幅） */}
        <FacultyChart facultyCounts={facultyCounts} />
        {/* 下段: 経験者率 + 学年の割合（横並び） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExperienceRate total={23} />
          <GradeChart gradeCounts={gradeCounts} total={total} />
        </div>
      </div>
    </section>
  );
}
