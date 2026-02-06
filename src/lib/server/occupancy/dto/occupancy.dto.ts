import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { occupancyRecordsTable } from '../occupancy.schema';

export const occupancyRecordDto = createSelectSchema(occupancyRecordsTable);
export const createOccupancyRecordDto = createInsertSchema(occupancyRecordsTable);
export const updateOccupancyRecordDto = createSelectSchema(occupancyRecordsTable).partial();

export type OccupancyRecordDto = typeof occupancyRecordDto;
export type CreateOccupancyRecordDto = typeof createOccupancyRecordDto;
export type UpdateOccupancyRecordDto = typeof updateOccupancyRecordDto;
