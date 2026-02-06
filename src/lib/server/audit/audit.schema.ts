import { pgEnum, pgTable, text, uuid, jsonb } from 'drizzle-orm/pg-core';

import { timestamps } from '../common/utils/drizzle';
import { usersTable } from '../users/users.schema';

export const auditActionEnum = pgEnum('audit_action', [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE',
  'LOGIN',
  'LOGOUT',
  'PASSWORD_CHANGE',
  'PASSWORD_RESET',
  'EMAIL_VERIFY',
  'UPLOAD',
  'DOWNLOAD',
  'APPROVE',
  'REJECT',
  'ASSIGN',
  'UNASSIGN',
  'CHECK_IN',
  'CHECK_OUT',
  'PAYMENT',
  'REFUND',
  'EXPORT',
  'IMPORT',
  'PERMISSION_CHANGE',
  'ROLE_CHANGE',
  'SYSTEM_CONFIG',
  'REPORT_GENERATED',
  'NOTIFICATION_SENT',
  'OTHER'
]);

export const auditEntityTypeEnum = pgEnum('audit_entity_type', [
  'USER',
  'ACCOMMODATION',
  'ROOM',
  'APPLICATION',
  'DOCUMENT',
  'OCCUPANCY',
  'BILLING',
  'PAYMENT',
  'NOTIFICATION',
  'REPORT',
  'SYSTEM',
  'SESSION',
  'CONFIG',
  'OTHER'
]);

export const auditLogsTable = pgTable('audit_logs', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'set null' }),
  action: auditActionEnum('action').notNull(),
  entityType: auditEntityTypeEnum('entity_type').notNull(),
  entityId: uuid('entity_id'),
  previousValue: jsonb('previous_value').$type<Record<string, unknown>>(),
  newValue: jsonb('new_value').$type<Record<string, unknown>>(),
  description: text('description').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  status: text('status').default('SUCCESS'),
  errorMessage: text('error_message'),
  ...timestamps
});

export type AuditLog = typeof auditLogsTable.$inferSelect;
export type AuditLogId = AuditLog['id'] & { __brand: 'AuditLogId' };
