/** R2オブジェクトストレージのクライアント */

// R2 Bucket の公開URL
// .env.local: NEXT_PUBLIC_R2_BASE_URL=https://xxx.r2.dev
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL || "";

/**
 * R2上のファイルの公開URLを生成
 *
 * @param path - R2内のパス（例: "/members/1.webp"）
 * @returns 完全なURL（例: "https://xxx.r2.dev/members/1.webp"）
 */
export function getPublicUrl(path: string): string {
  return `${R2_BASE_URL}${path}`;
}
