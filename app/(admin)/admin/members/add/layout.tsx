// Server Actions on Cloudflare Pages require edge runtime on the page that initiates them
export const runtime = "edge";

export default function AddLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
