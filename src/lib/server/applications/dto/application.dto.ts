import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { applicationsTable } from '../applications.schema';

export const applicationDto = createSelectSchema(applicationsTable);
export const createApplicationDto = createInsertSchema(applicationsTable);
export const updateApplicationDto = createSelectSchema(applicationsTable).partial();

export type ApplicationDto = typeof applicationDto;
export type CreateApplicationDto = typeof createApplicationDto;
export type UpdateApplicationDto = typeof updateApplicationDto;
