/**
 * One user per role, inserted only when the users table is empty.
 *
 * Local runs and the test suite need a known login per role; a real deployment seeds its
 * own users through POST /users once an admin exists, so this only ever fires once.
 */
import { randomUUID } from "node:crypto";

import bcrypt from "bcrypt";

import type { Database } from "../db";
import { users } from "../schema";

export const SEED_PASSWORD = "Password123!";

export async function seedUsers(database: Database): Promise<void> {
  const existing = await database.select({ id: users.id }).from(users).limit(1);
  if (existing.length > 0) return;

  function seedRow(email: string, passwordHash: string, fullName: string, role: string) {
    return {
      id: randomUUID(),
      email,
      passwordHash,
      fullName,
      role,
      isActive: true,
      tokenVersion: 0,
      createdAt: new Date(),
    };
  }

  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10);
  await database
    .insert(users)
    .values(seedRow("admin@example.com", passwordHash, "Alex Admin", "admin"));
  await database
    .insert(users)
    .values(seedRow("finance@example.com", passwordHash, "Fiona Finance", "finance"));
  const [manager] = await database
    .insert(users)
    .values(seedRow("manager@example.com", passwordHash, "Mia Manager", "manager"))
    .returning();
  await database.insert(users).values({
    ...seedRow("employee@example.com", passwordHash, "Eli Employee", "employee"),
    managerId: manager.id,
  });
}
