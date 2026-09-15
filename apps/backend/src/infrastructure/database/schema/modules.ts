import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const modules = pgTable('modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at')
})
