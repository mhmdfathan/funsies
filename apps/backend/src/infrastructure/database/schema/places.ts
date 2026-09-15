import { date, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { categories } from "./categories";

export const places = pgTable('places', {
  id: uuid('id').defaultRandom().primaryKey(),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  name: varchar('name', { length: 256 }).notNull(),
  address: text('address').notNull(),
  country: varchar('country', { length: 128 }).notNull(),
  description: varchar('description', { length: 512 }).notNull(),
  latitude: varchar('latitude', { length: 128 }).notNull(),
  longitude: varchar('longitude', { length: 128 }).notNull(),
  ianaTimezone: varchar('iana_timezone', { length: 64 }).notNull(),
  verifiedAt: date('verified_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at')
})
