// lib/db/staff.repository.ts
import { query } from "./client";
import { Person } from "@/types";

export async function getAll(): Promise<Person[]> {
  return query<Person>(
    "SELECT * FROM staff WHERE state = 'active' ORDER BY id ASC",
    [],
  );
}
