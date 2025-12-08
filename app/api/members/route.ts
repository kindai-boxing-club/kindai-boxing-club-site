import { getMembersFromD1, mapD1MemberToAppMember } from "@/lib/data/dbMembers";
import { NextResponse } from "next/server";

export const runtime = "edge"; // Cloudflare Pagesで動かすためにEdge Runtimeを指定

export async function GET(request: Request) {
  try {
    // Cloudflare D1への接続情報(env)を取得
    // Next.js on Cloudflare Pagesでは process.env または requestContext から取得
    const { env } = process as any;

    if (!env || !env.DB) {
      // ローカル開発などでDBがない場合、モックデータを返す
      console.warn("Database binding not found. Using mock data.");
      const { MOCK_MEMBERS } = await import("@/lib/data/mockMembers");
      return NextResponse.json(MOCK_MEMBERS);
    }

    // DBからデータ取得
    const d1Members = await getMembersFromD1(env.DB);

    // アプリで使用する形式に変換
    const members = d1Members.map(mapD1MemberToAppMember);

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
