import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { roomsTable } from '../rooms.schema';

export const roomDto = createSelectSchema(roomsTable);
export const createRoomDto = createInsertSchema(roomsTable);
export const updateRoomDto = createSelectSchema(roomsTable).partial();

export type RoomDto = typeof roomDto;
export type CreateRoomDto = typeof createRoomDto;
export type UpdateRoomDto = typeof updateRoomDto;
