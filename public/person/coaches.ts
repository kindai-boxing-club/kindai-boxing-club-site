/**
 * コーチデータ定義
 */
import { Person } from "@/types";
import { getPath } from "@/lib/utils/path";

/**
 * コーチデータ定義
 *
 * 役割: コーチの静的データを管理する
 */
export const COACHES_DATA: Person[] = [
  {
    id: "coach_kuramoto",
    name: "倉本 亮",
    classification: "コーチ",
    position: "コーチ",
    image: getPath("/person/倉本亮.png"),
    bio: "",
  },
  {
    id: "coach_kunishige",
    name: "國重 憲司",
    classification: "コーチ",
    position: "コーチ",
    image: getPath("/person/國重憲司.png"),
    bio: "",
  },
];
