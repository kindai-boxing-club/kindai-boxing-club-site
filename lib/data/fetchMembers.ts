import fs from "fs";
import path from "path";
import { Person } from "@/types";
import { parseCSV } from "@/lib/utils/csv";
import { getPath } from "@/lib/utils/path";

// クライアントサイドでのデータ取得用関数
export async function fetchMembers(): Promise<Person[]> {
  // サーバーサイド(SSR)やビルド時ではなく、クライアントサイドで実行されることを想定
  // ベースURLは環境によって異なる場合があるため、相対パスで指定
  try {
    const res = await fetch("/api/members", {
      cache: "no-store", // 常に新しいデータを取得
    });

    if (!res.ok) {
      throw new Error("Failed to fetch members");
    }

    const members: Person[] = await res.json();
    return members;
  } catch (error) {
    console.error(error);
    return [];
  }
}
