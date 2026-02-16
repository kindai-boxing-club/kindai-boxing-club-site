import {
  getPersonImageUrl,
  resolveImagePath,
} from "@/lib/storage/image.repository";

/**
 * メンバーの画像URLを取得
 *
 * @param id - メンバーのID
 * @returns メンバーの画像URL
 */
export function getImageUrl(id: number): string {
  return getPersonImageUrl(id);
}

/**
 * 画像のパスを取得
 *
 * @param imagePath - 画像のパス
 * @returns 画像のパス
 */
export function getImagePath(imagePath: string): string {
  return resolveImagePath(imagePath);
}
