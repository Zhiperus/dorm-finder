import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { accommodationsTable } from '../accommodations.schema';

export const accommodationDto = createSelectSchema(accommodationsTable);
export const createAccommodationDto = createInsertSchema(accommodationsTable);
export const updateAccommodationDto = createSelectSchema(accommodationsTable).partial();

export type AccommodationDto = typeof accommodationDto;
export type CreateAccommodationDto = typeof createAccommodationDto;
export type UpdateAccommodationDto = typeof updateAccommodationDto;
