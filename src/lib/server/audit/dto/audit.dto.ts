import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { auditLogsTable } from '../audit.schema';

export const auditLogDto = createSelectSchema(auditLogsTable);
export const createAuditLogDto = createInsertSchema(auditLogsTable);

export type AuditLogDto = typeof auditLogDto;
export type CreateAuditLogDto = typeof createAuditLogDto;
