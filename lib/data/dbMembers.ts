import type { D1Database } from "@cloudflare/workers-types";
import { Person } from "@/types";

// DB Accessor
export async function getMembersFromD1(db: D1Database): Promise<Person[]> {
  try {
    const { results } = await db
      .prepare(
        `
        SELECT * FROM members 
        ORDER BY 
          grade DESC,
          CASE 
            WHEN position = '主将' THEN 1
            WHEN position = '副主将' THEN 2
            WHEN position = '主務' THEN 3
            WHEN position = '会計' THEN 4
            ELSE 5 
          END ASC,
          id ASC
      `
      )
      .all<Person>();
    return results;
  } catch (e) {
    console.error("Failed to fetch members from D1:", e);
    return [];
  }
}
