import { pgTable, uuid, timestamp, uniqueIndex, integer } from 'drizzle-orm/pg-core';
import { roles } from './roles';
import { permissions } from './permissions';

export const rolesPermissions = pgTable('roles_permissions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  roleId: uuid('role_id').notNull().references(() => roles.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  permissionId: uuid('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}, (table) => {
  return {
    rolePermissionIdx: uniqueIndex('role_permission_idx').on(table.roleId, table.permissionId),
  };
});
