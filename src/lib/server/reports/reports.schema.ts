import { pgEnum, pgTable, text, timestamp, uuid, integer, jsonb } from 'drizzle-orm/pg-core';

import { timestamps } from '../common/utils/drizzle';

export const reportTypeEnum = pgEnum('report_type', [
  'OCCUPANCY',
  'WAITING_LIST',
  'STUDENT_HISTORY',
  'REVENUE',
  'UNPAID_FEES',
  'APPLICATION_SUMMARY',
  'ROOM_UTILIZATION',
  'MAINTENANCE_SUMMARY',
  'STAFF_ACTIVITY',
  'CUSTOM'
]);

export const reportStatusEnum = pgEnum('report_status', [
  'PENDING',
  'GENERATING',
  'COMPLETED',
  'FAILED',
  'EXPIRED'
]);

export const reportFormatsEnum = pgEnum('report_format', ['PDF', 'EXCEL', 'CSV', 'JSON', 'HTML']);

export const reportsTable = pgTable('reports', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: reportTypeEnum('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  parameters: jsonb('parameters').$type<{
    startDate?: string;
    endDate?: string;
    accommodationId?: string;
    roomType?: string;
    status?: string;
    filters?: Record<string, unknown>;
  }>(),
  format: reportFormatsEnum('format').default('PDF').notNull(),
  status: reportStatusEnum('status').default('PENDING').notNull(),
  generatedBy: uuid('generated_by').notNull(),
  generatedAt: timestamp('generated_at', { mode: 'date' }),
  expiresAt: timestamp('expires_at', { mode: 'date' }),
  filePath: text('file_path'),
  fileSize: integer('file_size'),
  downloadCount: integer('download_count').default(0),
  errorMessage: text('error_message'),
  ...timestamps
});

export type Report = typeof reportsTable.$inferSelect;
export type ReportId = Report['id'] & { __brand: 'ReportId' };
