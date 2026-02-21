/** 部員/コーチの表示カード */
"use client";

import type { Person } from "@/types";
import PersonImage from "@/components/public/ui/PersonImage";
import PositionBadge from "@/components/public/ui/PositionBadge";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// ユーティリティ: クラス名の結合を簡単にする
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Variant = "member" | "coach";

type PersonCardProps = {
  person: Person;
  variant?: Variant;
  onClick?: () => void;
};

/**
 * PersonCard
 *
 * MemberCardとCoachCardの共通部分を抽出した統合コンポーネント。
 * Variantパターン適用により、構造（HTML）とスタイル（CSS）の責務を分離し、
 * DRY原則を遵守しています。
 */
export default function PersonCard({
  person,
  variant = "member",
  onClick,
}: PersonCardProps) {
  const isCoach = variant === "coach";

  // スタイリング定義（Variantごとの違いをここに集約）
  const containerStyles = isCoach
    ? "bg-gray-950 border-yellow-900/30 hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]"
    : "bg-white border-transparent hover:border-red-600 shadow-sm hover:shadow-xl";

  const nameStyles = isCoach
    ? "text-2xl text-transparent bg-clip-text bg-linear-to-b from-[#b8860b] via-[#ffd700] to-[#b8860b] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
    : "text-lg text-gray-900 italic group-hover:text-red-600 group-active:text-red-600";

  const badgeStyles = isCoach
    ? "bg-black/80 backdrop-blur-sm text-yellow-500 border border-yellow-900/50"
    : "bg-black text-white";

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative h-full rounded-none overflow-hidden border transition-all duration-500 transform hover:-translate-y-1 active:scale-[0.98] active:brightness-95",
        containerStyles,
        onClick && "cursor-pointer",
      )}
    >
      {/* 1. 画像エリア */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
        <PersonImage
          person={person}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* オーバーレイ (Member版のみ) */}
        {!isCoach && (
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* 役職バッジ (存在する場合のみ) */}
        {(person.position || isCoach) && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3">
            <PositionBadge
              label={person.position || (isCoach ? "COACH" : "")}
              className={badgeStyles}
            />
          </div>
        )}
      </div>

      {/* 2. コンテンツエリア */}
      <div className="p-4 relative flex flex-col items-center text-center">
        <h3
          className={cn(
            "font-black tracking-tighter mb-1 transition-colors relative z-10",
            nameStyles,
          )}
        >
          {person.name}
        </h3>

        {/* サブ情報: 学部 (Member) or 装飾ライン (Coach) */}
        {isCoach ? (
          <div className="w-16 h-px bg-linear-to-r from-transparent via-yellow-600 to-transparent mx-auto transform origin-center group-hover:scale-x-150 transition-transform duration-300 mt-2" />
        ) : (
          person.faculty && (
            <p className="text-xs text-gray-500 font-medium relative z-10 line-clamp-1">
              {person.is_manager === 1
                ? `${person.faculty} ${person.grade}`
                : person.faculty}
            </p>
          )
        )}
      </div>
    </div>
  );
}
