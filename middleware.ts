/** Admin機能の一時的なブロック（Cloudflare Access設定完了後に削除） */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
