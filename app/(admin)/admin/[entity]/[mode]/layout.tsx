/**
 * [entity]/[mode] の動的ルートのレイアウト
 *
 * Cloudflare Pages で D1/R2 を使うために edge runtime を指定。
 * UI のラップは親の admin/layout.tsx が担当するため、ここでは children をそのまま返す。
 */
export const runtime = "edge";

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
