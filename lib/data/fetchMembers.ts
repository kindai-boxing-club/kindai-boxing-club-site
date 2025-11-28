import fs from "fs";
import path from "path";
import { Member } from "@/types";
import { parseCSV } from "@/lib/utils/csv";
import { EXECUTIVES_DATA, COACHES_DATA } from "./constants";

const DATA_DIR = path.join(process.cwd(), "public", "data", "members");

async function readCSV(filename: string): Promise<Record<string, string>[]> {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.promises.readFile(filePath, "utf-8");
    return parseCSV(content);
  } catch (error) {
    console.error(`Failed to read CSV file: ${filename}`, error);
    return [];
  }
}

function mapClassification(val: string): string {
  if (val === "0") return "マネージャー";
  if (["1", "2", "3", "4"].includes(val)) return `${val}回生`;
  return val; // "コーチ", "監督" etc.
}

export async function fetchExecutives(): Promise<Member[]> {
  return EXECUTIVES_DATA.map((member, index) => ({
    ...member,
    id: `exec_${index}`,
    position: member.classification,
  }));
}

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
    bio: row.history, // Use history as bio for now
  }));
}

export async function fetchCoaches(): Promise<Member[]> {
  return COACHES_DATA.map((member, index) => ({
    ...member,
    id: `coach_${index}`,
    position: member.classification,
  }));
}


