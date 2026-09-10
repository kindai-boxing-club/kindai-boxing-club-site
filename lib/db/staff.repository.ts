// lib/db/staff.repository.ts
import { execute, query } from "./client";
import { Staff, StaffInput, StaffUpdate } from "@/types";
import {
  restore as restorePerson,
  remove as removePerson,
  getById as getPersonById,
  eliminate as eliminatePerson,
} from "./person.repository";

const TABLE = "staff";

export const get = (id: number) => getPersonById(TABLE, id);
export const remove = (id: number) => removePerson(TABLE, id);
export const restore = (id: number) => restorePerson(TABLE, id);
export const eliminate = (id: number) => eliminatePerson(TABLE, id);

/**
 * すべてのactiveなStaffを取得する
 * @returns Staffの配列
 */
export async function getAllActive(): Promise<Staff[]> {
  const staff = await query<Staff>(
    "SELECT * FROM staff WHERE state = 'active' ORDER BY id ASC",
    [],
  );
  return staff.map((staff) => {
    return {
      ...staff,
      position: staff.grade,
    };
  });
}

/**
 * 全Staffを取得（状態を問わず）
 */
export async function getAll(): Promise<Staff[]> {
  const staff = await query<Staff>(
    `SELECT * FROM staff ORDER BY
      CASE state WHEN 'active' THEN 1 WHEN 'graduated' THEN 2 WHEN 'deleted' THEN 3 ELSE 99 END,
      id ASC`,
    [],
  );
  return staff.map((staff) => {
    return {
      ...staff,
      position: staff.grade,
    };
  });
}

/**
 * Staffを追加する
 * @param data - Staffのデータ
 * @returns Staffを追加したかどうか
 */
export async function create(data: StaffInput): Promise<boolean> {
  return execute(
    "INSERT INTO staff (name, grade, state, bio) VALUES (?, ?, 'active', ?)",
    [data.name, data.grade, data.bio],
  );
}

/**
 * Staffを更新する
 * @param id - 更新対象のStaff ID
 * @param data - Staffの更新データ
 * @returns 成功したかどうか
 */
export async function update(id: number, data: StaffUpdate): Promise<boolean> {
  return execute(
    "UPDATE staff SET name = ?, grade = ?, bio = ?, state = ? WHERE id = ?",
    [data.name, data.grade, data.bio, data.state, id],
  );
}