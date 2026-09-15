import { pgTable, uuid, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  tokenDigest: varchar('token_digest', { length: 256 }).notNull().unique(),
  idleExpiresAt: timestamp('idle_expires_at').notNull(),
  absoluteExpiresAt: timestamp('absolute_expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})
