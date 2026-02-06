import { pgTable, text, uuid, pgEnum } from 'drizzle-orm/pg-core';

import { citext, timestamps } from '../common/utils/drizzle';

export const userRolesEnum = pgEnum('user_roles', ['STUDENT', 'DORM_MANAGER', 'ADMIN', 'GUEST']);

export const usersTable = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: citext().unique().notNull(),
  role: userRolesEnum('role').default('STUDENT').notNull(),
  avatar: text(),
  ...timestamps
});

export type User = typeof usersTable.$inferSelect;
export type UserId = User['id'] & { __brand: 'UserId' };
