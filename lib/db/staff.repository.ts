// lib/db/staff.repository.ts
import { query } from "./client";
import { Person } from "@/types";
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

export async function getAll(): Promise<Person[]> {
  return query<Person>(
    "SELECT * FROM staff WHERE state = 'active' ORDER BY id ASC",
    [],
  );
}
