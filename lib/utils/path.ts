/**
 * アプリケーションのベースパス。
 * 本番環境（GitHub Pages）では、リポジトリ名が設定されるべきですが、
 * User Pages（username.github.io）の場合はルートから配信されるため空文字となります。
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "" : "";

/**
 * 指定されたパスにベースパスを付与します。
 * 画像やその他の静的アセットへのパス生成に使用します。
 *
 * @param path プレフィックスを付与するパス (例: "/data/image.png")
 * @returns ベースパスが付与されたパス (例: "/test/data/image.png")
 */
export function getPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // Ensure path starts with / if not present (unless empty)
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${BASE_PATH}${normalizedPath}`;
}
