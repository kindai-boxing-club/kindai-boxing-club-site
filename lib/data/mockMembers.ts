/**
 * @file lib/data/mockMembers.ts
 * @description ローカル開発・ビルド時に使用するモックデータ
 *
 * D1 データベースに接続できない環境（ローカル開発、Vercel ビルド等）で
 * 代わりに表示されるダミーの部員データです。
 *
 * 本番環境では使用されません。
 */

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
    id: 2210002,
    name: "テスト用データです",
    grade: "3年",
    position: "副将",
    weight_class: "ミドル級",
    faculty: "情報学部",
    is_manager: 0,
  },
];
