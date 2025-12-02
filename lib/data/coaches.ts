/**
 * コーチデータ定義
 */
import { Member } from "@/types";

/**
 * コーチデータ定義
 * 
 * 役割: コーチの静的データを管理する
 */
export const COACHES_DATA: Omit<Member, "id" | "position">[] = [
  {
    name: "倉本 亮",
    classification: "コーチ",
    image: "/data/staff/倉本亮.png",
    bio: "",
  },
  {
    name: "國重 憲司",
    classification: "コーチ",
    image: "/data/staff/國重憲司.png",
    bio: "",
  },
];
