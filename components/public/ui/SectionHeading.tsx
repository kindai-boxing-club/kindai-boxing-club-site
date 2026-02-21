/** セクションの見出し */

type Props = {
  title: string;
  subtitle: string;
  bg?: "light" | "dark";
};

export default function SectionHeading({
  title,
  subtitle,
  bg = "light",
}: Props) {
  const textColor = bg === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className="mb-24 text-center relative">
      {/*背景の薄い巨大文字 */}
      <h2
        className={`${textColor} text-6xl md:text-9xl font-black tracking-tighter opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full select-none`}
      >
        {title}
      </h2>
      {/* メイン文字 */}
      <h2
        className={`${textColor} text-5xl md:text-7xl font-black tracking-tighter relative z-10`}
      >
        {title}
      </h2>
      {/* サブタイトル */}
      <div className="mt-6 flex justify-center">
        <div className="bg-red-600 text-white font-bold py-1 px-6 text-sm tracking-[0.3em] uppercase -skew-x-12">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
