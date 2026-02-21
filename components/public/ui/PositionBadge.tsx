/** 役職バッジ */
"use client";

type Props = {
  label: string;
  className?: string;
};

/**
 * 役職バッジコンポーネント
 * - 全員共通の平行四辺形デザイン (-skew-x-12)
 * - 色はclassNameで指定可能
 */
export default function PositionBadge({
  label,
  className = "bg-black text-white",
}: Props) {
  return (
    <div
      className={`inline-block px-4 py-1 transform -skew-x-12 shadow-md ${className}`}
    >
      <span className="block transform skew-x-12 text-xs font-bold tracking-widest uppercase items-center justify-center">
        {label}
      </span>
    </div>
  );
}
