import { pgEnum, pgTable, text, timestamp, uuid, integer, jsonb } from 'drizzle-orm/pg-core';
import { timestamps } from '../common/utils/drizzle';
import { usersTable } from '../users/users.schema';
import { roomsTable } from '../rooms/rooms.schema';

export const occupancyStatusEnum = pgEnum('occupancy_status', [
    'PENDING',
    'CHECKED_IN',
    'CHECKED_OUT',
    'TRANSFERRED',
    'TERMINATED'
]);

export const occupancyRecordsTable = pgTable('occupancy_records', {
    id: uuid('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    studentId: uuid('student_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    roomId: uuid('room_id')
        .notNull()
        .references(() => roomsTable.id, { onDelete: 'cascade' }),
    status: occupancyStatusEnum('status').default('PENDING').notNull(),
    checkInDate: timestamp('check_in_date', { mode: 'date' }),
    checkOutDate: timestamp('check_out_date', { mode: 'date' }),
    expectedCheckOutDate: timestamp('expected_check_out_date', { mode: 'date' }),
    checkInMethod: text('check_in_method'),
    checkOutMethod: text('check_out_method'),
    checkedInBy: uuid('checked_in_by'),
    checkedOutBy: uuid('checked_out_by'),
    bedAssignment: text('bed_assignment'),
    moveInNotes: text('move_in_notes'),
    moveOutNotes: text('move_out_notes'),
    roomConditionOnMoveIn: jsonb('room_condition_on_move_in').$type<{
        items: Array<{ item: string; condition: string; notes: string }>;
        photos: string[];
        overallCondition: string;
    }>(),
    roomConditionOnMoveOut: jsonb('room_condition_on_move_out').$type<{
        items: Array<{ item: string; condition: string; notes: string }>;
        photos: string[];
        overallCondition: string;
    }>(),
    terminationReason: text('termination_reason'),
    ...timestamps
});

export type OccupancyRecord = typeof occupancyRecordsTable.$inferSelect;
export type OccupancyRecordId = OccupancyRecord['id'] & { __brand: 'OccupancyRecordId' };
