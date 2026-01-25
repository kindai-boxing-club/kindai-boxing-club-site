/**
 * @file lib/utils/cn.ts
 * @description Tailwind CSS クラス名の結合ユーティリティ
 *
 * clsx と tailwind-merge を組み合わせて、
 * 重複するクラス名を安全にマージします。
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
