// lib/db/staff.repository.ts
import { execute, query } from "./client";
import { Staff, StaffInput } from "@/types";
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
