/**
 * @file components/public/ui/CategoryHeading.tsx
 * @description カテゴリの見出しコンポーネント
 *
 * 使用箇所:
 * - MemberSection: 学年ごとの見出し（"4年"、"3年"など）
 * - StaffSection: 役職ごとの見出し（"部長"、"コーチ"など）
 */

type Props = {
  title: string;
};

export default function CategoryHeading({ title }: Props) {
  return (
    <div className="max-w-5xl mx-auto mb-12">
      <div className="flex items-center gap-4">
        <div className="w-2 h-12 bg-red-600 transform -skew-x-12" />
        <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
          {title}
        </h3>
      </div>
    </div>
  );
}
