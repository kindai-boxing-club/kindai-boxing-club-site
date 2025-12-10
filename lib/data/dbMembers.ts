import { getPath } from "@/lib/utils/path";
import type { D1Database } from "@cloudflare/workers-types";

export interface Member {
  id: string; // 学籍番号は文字列
  name: string;
  grade: number; // 数値
  position?: string;
  is_manager: number; // SQLiteではBooleanは0/1で返る
  faculty: string;
  weight_class?: string;
  bio?: string;
  image_url?: string;
}

export async function getMembersFromD1(db: D1Database): Promise<Member[]> {
  try {
    const { results } = await db
      .prepare("SELECT * FROM members ORDER BY grade DESC, id ASC")
      .all<Member>();
    return results;
  } catch (e) {
    console.error("Failed to fetch members from D1:", e);
    return [];
  }
}

// 既存のMember型（表示用）への変換ヘルパー
export function mapD1MemberToAppMember(member: Member) {
  return {
    id: member.id,
    name: member.name,
    classification: `${member.grade}年`, // 数値を"〇年"に変換
    position: member.position || "",
    isManager: member.is_manager === 1,
    faculty: member.faculty,
    weight: member.weight_class || "",
    image: member.image_url ? getPath(`/members/${member.image_url}`) : "",
    bio: member.bio || "",
  };
}
