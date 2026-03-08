/** 画像パス解決ユーティリティ */

import { getPublicUrl } from "./client";
import { Person } from "@/types";

/**
 * 部員IDから画像URLを生成
 *
 * @param id - 部員ID
 * @returns 画像URL
 */
export function getPersonImageUrl(person: Person): string {
  if (!person.id) return "/images/default.png";
  const folder = "faculty" in person ? "members" : "staff";
  return getPublicUrl(`/${folder}/${person.id}.webp`);
}

/**
 * 画像パスを解決
 *
 * @param path - 画像パス
 * @returns 解決済み画像パス
 */
export function resolveImagePath(path: string): string {
  if (path === "") return "";
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : "/" + path;
  if (
    normalizedPath.startsWith("/staff/") ||
    normalizedPath.startsWith("/members/")
  )
    return getPublicUrl(normalizedPath);
  return normalizedPath;
}
