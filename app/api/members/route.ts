import { getMembersFromD1 } from "@/lib/data/dbMembers";
import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge"; // Cloudflare Pagesで動かすためにEdge Runtimeを指定

export async function GET() {
  try {
    // Cloudflare D1への接続情報(env)を取得
    // Next.js on Cloudflare Pagesでは process.env または requestContext から取得
    let d1Database;

    try {
      const { env } = getRequestContext();
      if (env && env.DB) {
        d1Database = env.DB;
      }
    } catch (e) {
      console.error("D1 database error:", e);
      // Fallback to mock data on error (for local dev without D1)など、getRequestContextが機能しない場合はここで無視してMockに倒す
      console.warn(
        "getRequestContext failed or DB not found, falling back to mock data."
      );
    }

    if (!d1Database) {
      // ローカル開発などでDBがない場合、モックデータを返す
      console.warn("Database binding not found. Using mock data.");
      const { MOCK_MEMBERS } = await import("@/lib/data/mockMembers");
      return NextResponse.json(MOCK_MEMBERS);
    }

    // DBからデータ取得
    const members = await getMembersFromD1(d1Database);

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
