import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { modules } from "./modules";

export const permissions = pgTable('permissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  moduleId: uuid('module_id').notNull().references(() => modules.id, {
    onUpdate: 'cascade', onDelete: 'cascade'
  }),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at')
})
