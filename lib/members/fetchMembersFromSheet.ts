import { Member } from "@/types";

/**
 * Google Sheets APIから部員・スタッフデータを取得する関数
 * @param sheetId スプレッドシートID
 * @param apiKey Google APIキー
 * @param sheetName シート名（デフォルト: "部員"）
 * @returns Member[]
 */
export async function fetchMembersFromSheet(
  sheetId: string,
  apiKey: string,
  sheetName: string = "部員"
): Promise<Member[]> {
  const range = `${sheetName}!A2:G`; // 1行目はヘッダー想定
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Google Sheets API fetch error");
  const data = await res.json();
  if (!data.values) return [];
  // A:名前, B:分類, C:役職, D:階級, E:DriveURL, F:ViewURL, G:説明
  return data.values.map((row: string[], idx: number) => ({
    id: `${row[0] || ""}_${idx}`,
    name: row[0] || "",
    classification: row[1]?.trim() || "未分類",
    position: row[2] || "",
    weight: row[3] || "",
    image: row[5] || "", // ViewURL（F列）を使用
    bio: row[6] || "",
  }));
}
