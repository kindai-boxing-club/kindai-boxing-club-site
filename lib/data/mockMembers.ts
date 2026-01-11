import { Person } from "@/types";

// ローカル開発用ダミーデータ
export const MOCK_MEMBERS: Person[] = [
  {
    id: 2210001,
    name: "鬼山田 山之助",
    grade: "4年",
    position: "主将",
    weight_class: "ミドル級",
    faculty: "情報学部",
    is_manager: 0,
  },
  {
    id: 2310001,
    name: "佐藤 砂糖太郎",
    grade: "3年",
    position: "副将",
    weight_class: "ミニマム級",
    faculty: "経済学部",
    is_manager: 0,
  },
  {
    id: 2310002,
    name: "佐藤 塩太郎",
    grade: "3年",
    position: null,
    weight_class: "ミニマム級",
    faculty: "経営学部",
    is_manager: 0,
  },
  {
    id: 2310003,
    name: "佐藤 醤油太郎",
    grade: "3年",
    position: null,
    weight_class: "ヘビー級",
    faculty: "グローバルシステムイマジネーションデザイン学部",
    is_manager: 0,
  },
  {
    id: 2410001,
    name: "鈴木 鈴雄",
    grade: "2年",
    position: null,
    weight_class: "バンタム級",
    faculty: "文学部",
    is_manager: 0,
  },
  {
    id: 2510001,
    name: "佐々木 笹子",
    grade: "1年",
    position: "主務",
    is_manager: 1,
    weight_class: null,
    faculty: "法学部",
  },
];
