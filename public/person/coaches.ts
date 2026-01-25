/**
 * @file public/person/coaches.ts
 * @description コーチ（指導者）の静的データ
 *
 * このファイルの役割:
 * - コーチのデータを静的に管理
 * - D1 データベースには登録せず、コード内で直接定義
 */

import { Person } from "@/types";

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
    weight_class: null,
    faculty: "コーチ",
  },
  {
    id: 9002,
    name: "中島 健",
    grade: "コーチ",
    is_manager: 0,
    position: "コーチ",
    weight_class: null,
    faculty: "コーチ",
  },
  {
    id: 9003,
    name: "國重 憲司",
    grade: "コーチ",
    is_manager: 0,
    position: "コーチ",
    weight_class: null,
    faculty: "コーチ",
  },
];
