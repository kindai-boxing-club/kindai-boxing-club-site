// lib/db/staff.repository.ts
import { query } from "./client";
import { Staff } from "@/types";

export async function getAll(): Promise<Staff[]> {
  return query<Staff>(
    "SELECT * FROM staff WHERE state = 'active' ORDER BY id ASC",
    [],
  );
}
