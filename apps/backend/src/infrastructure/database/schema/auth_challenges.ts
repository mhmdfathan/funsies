import { pgTable, uuid, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const auth_challenges = pgTable('auth_challenges', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  codeDigest: varchar('code_digest').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  attempts: integer('attemps').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull()
})
