import { Person } from "@/types";
import { getPath } from "@/lib/utils/path";

// ローカル開発用ダミーデータ (D1のデータ構造を模倣)
// 本番D1と同じ内容を入れておくと確認しやすいです
export const MOCK_MEMBERS: Person[] = [
  {
    id: "2210001",
    name: "山田 山之助",
    classification: "4年",
    position: "主将",
    weight: "ミドル級",
    faculty: "情報学部",
    image: getPath("/members/yamada-yamanosuke.webp"),
    bio: "2025年 世界選手権 審査委員特別賞",
  },
  {
    id: "2310001",
    name: "佐藤 砂糖太郎",
    classification: "3年",
    position: "副主将",
    weight: "ミニマム級",
    faculty: "経済学部",
    image: getPath("/members/sato-satotaro.webp"),
    bio: "",
  },
  {
    id: "2310002",
    name: "佐藤 塩太郎",
    classification: "3年",
    position: "",
    weight: "ミニマム級",
    faculty: "経営学部",
    image: getPath("/members/sato-shiotaro.webp"),
    bio: "",
  },
  {
    id: "2310003",
    name: "佐藤 醤油太郎",
    classification: "3年",
    position: "",
    weight: "ヘビー級",
    faculty: "グローバルシステムイマジネーションデザイン学部",
    image: getPath("/members/sato-shoyutaro.webp"),
    bio: "",
  },
  {
    id: "2410001",
    name: "鈴木 鈴雄",
    classification: "2年",
    position: "",
    weight: "バンタム級",
    faculty: "文学部",
    image: getPath("/members/suzuki-suzuo.webp"),
    bio: "",
  },
  {
    id: "2510001",
    name: "佐々木 笹子",
    classification: "1年",
    position: "主務",
    weight: "マネージャー",
    faculty: "法学部",
    image: getPath("/members/sasaki-sasako.webp"),
    bio: "",
  },
];
