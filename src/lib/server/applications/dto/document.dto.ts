import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { documentsTable } from '../applications.schema';

export const documentDto = createSelectSchema(documentsTable);
export const createDocumentDto = createInsertSchema(documentsTable);
export const updateDocumentDto = createSelectSchema(documentsTable).partial();

export type DocumentDto = typeof documentDto;
export type CreateDocumentDto = typeof createDocumentDto;
export type UpdateDocumentDto = typeof updateDocumentDto;
