// R2 Bucket Public Access URL
// .env (production) または .env.local (development) を参照
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL || "";

/**
 * リソースのパスを生成するためのユーティリティ
 * - `/members/` や `/staff/` 以下の画像: R2のURLに変換
 * - その他: そのままパスを返す（Cloudflare Pages / Localhostはルート配信のため）
 */
export function getPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // 必ず "/" で始まるように正規化
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // 特定ディレクトリの画像はR2（外部ストレージ）から配信
  if (
    normalizedPath.startsWith("/staff/") ||
    normalizedPath.startsWith("/members/")
  ) {
    return `${R2_BASE_URL}${normalizedPath}`;
  }

  // それ以外はそのまま（ルート相対パス）
  return normalizedPath;
}

/**
 * 部員IDから画像URLを生成する
 * 例: id=2210001 -> {R2_BASE_URL}/members/2210001.webp
 */
export function getMemberImage(id: number): string {
  if (!id) return "/images/default.png";
  return `${R2_BASE_URL}/members/${id}.webp`;
}
