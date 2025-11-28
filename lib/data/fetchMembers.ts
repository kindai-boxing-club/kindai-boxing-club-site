import fs from "fs";
import path from "path";
import { Member } from "@/types";
import { parseCSV } from "@/lib/utils/csv";
import { COACHES_DATA } from "./coaches";

const DATA_DIR = path.join(process.cwd(), "public", "data", "members");

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

function mapClassification(val: string): string {
  if (val === "0") return "マネージャー";
  if (["1", "2", "3", "4"].includes(val)) return `${val}回生`;
  return val; // "コーチ", "監督" など
}

/**
 * 幹部データの取得（ダミー）
 * 
 * 役割: セクションのグルーピングロジックを機能させるためのダミーデータを返す
 * 実際の表示: MemberGridコンポーネント内で専用コンポーネントに分岐して表示される
 */
export async function fetchExecutives(): Promise<Member[]> {
  return [
    { id: "exec_president", name: "清滝 ふみ", classification: "部長" },
    { id: "exec_general_director", name: "赤井 英和", classification: "総監督" },
    { id: "exec_director", name: "名城 信男", classification: "監督" },
  ];
}

/**
 * 部員データの取得
 * 
 * 役割: CSVファイルから部員データを読み込み、Member型に変換して返す
 */
export async function fetchMembers(): Promise<Member[]> {
  const rows = await readCSV("members.csv");
  return rows.map((row, idx) => ({
    id: `member_${idx}`,
    name: row.name,
    classification: mapClassification(row.classification),
    position: row.position,
    weight: row.weight,
    faculty: row.faculty,
    history: row.history,
    image: `/data/members/${row.name.replace(/\s+/g, "")}.png`,
    bio: row.history, // 今のところ経歴をbioとして使用
  }));
}

/**
 * コーチデータの取得
 * 
 * 役割: 定数ファイルからコーチデータを読み込み、IDを付与して返す
 */
export async function fetchCoaches(): Promise<Member[]> {
  return COACHES_DATA.map((member, index) => ({
    ...member,
    id: `coach_${index}`,
    position: member.classification,
  }));
}


