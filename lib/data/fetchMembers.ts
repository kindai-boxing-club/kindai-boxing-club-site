import fs from "fs";
import path from "path";
import { Person } from "@/types";
import { parseCSV } from "@/lib/utils/csv";
import { getPath } from "@/lib/utils/path";

const DATA_DIR = path.join(process.cwd(), "public", "person");

async function readCSV(filename: string): Promise<Record<string, string>[]> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.promises.readFile(filePath, "utf-8");
    return parseCSV(content);
  } catch (error) {
    console.error(`CSVファイルの読み込みに失敗しました: ${filename}`, error);
    return [];
  }
}

/**
 * 部員データの取得
 *
 * 役割: CSVファイルから部員データを読み込み、Member型に変換して返す
 */
export async function fetchMembers(): Promise<Person[]> {
  const rows = await readCSV("members.csv");
  return rows.map((row, idx) => ({
    id: `member_${idx}`,
    name: row.name,
    classification: row.classification,
    position: row.position,
    weight: row.weight,
    faculty: row.faculty,
    image: getPath(`/person/${row.image}`),
    bio: row.bio,
  }));
}
