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
    id: 9001,
    name: "倉本 亮",
    grade: "コーチ",
    is_manager: 0,
    position: "コーチ",
    weight_class: "",
    faculty: null,
    image_url: getPath("/staff/kuramoto-ryo.webp"),
    bio: null,
  },
  {
    id: 9002,
    name: "中島 健",
    grade: "コーチ",
    is_manager: 0,
    position: "コーチ",
    weight_class: "",
    faculty: null,
    image_url: getPath("/staff/nakajima-ken.webp"),
    bio: null,
  },
  {
    id: 9002,
    name: "國重 憲司",
    grade: "コーチ",
    is_manager: 0,
    position: "コーチ",
    weight_class: "",
    faculty: null,
    image_url: getPath("/staff/kunishige-kenji.webp"),
    bio: null,
  },
];
