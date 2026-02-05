import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { reportsTable } from '../reports.schema';

export const reportDto = createSelectSchema(reportsTable);
export const createReportDto = createInsertSchema(reportsTable);
export const updateReportDto = createSelectSchema(reportsTable).partial();

export type ReportDto = typeof reportDto;
export type CreateReportDto = typeof createReportDto;
export type UpdateReportDto = typeof updateReportDto;
