import type { D1Database } from "@cloudflare/workers-types";
import { Person } from "@/types";

// DB Accessor
export async function getMembersFromD1(db: D1Database): Promise<Person[]> {
  try {
    const { results } = await db
      .prepare("SELECT * FROM members ORDER BY grade DESC, id ASC")
      .all<Person>();
    return results;
  } catch (e) {
    console.error("Failed to fetch members from D1:", e);
    return [];
  }
}
