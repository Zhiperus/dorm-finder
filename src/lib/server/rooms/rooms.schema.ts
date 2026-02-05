import {
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    integer,
    boolean,
    jsonb
} from 'drizzle-orm/pg-core';
import { timestamps } from '../common/utils/drizzle';
import { accommodationsTable } from '../accommodations/accommodations.schema';

export const roomTypeEnum = pgEnum('room_type', [
    'SINGLE',
    'DOUBLE',
    'TRIPLE',
    'QUAD',
    'SUITE',
    'STUDIO',
    'APARTMENT'
]);

export const roomStatusEnum = pgEnum('room_status', [
    'AVAILABLE',
    'OCCUPIED',
    'MAINTENANCE',
    'RESERVED',
    'BLOCKED'
]);

export const bedTypeEnum = pgEnum('bed_type', ['SINGLE', 'FULL', 'QUEEN', 'KING', 'BUNK']);

export const roomsTable = pgTable('rooms', {
    id: uuid('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    accommodationId: uuid('accommodation_id')
        .notNull()
        .references(() => accommodationsTable.id, { onDelete: 'cascade' }),
    roomNumber: text('room_number').notNull(),
    floor: integer('floor'),
    building: text('building'),
    type: roomTypeEnum('type').notNull(),
    bedType: bedTypeEnum('bed_type').notNull(),
    totalBeds: integer('total_beds').notNull(),
    availableBeds: integer('available_beds').notNull(),
    pricePerSemester: integer('price_per_semester').notNull(),
    pricePerYear: integer('price_per_year'),
    status: roomStatusEnum('status').default('AVAILABLE').notNull(),
    amenities: jsonb('amenities').$type<string[]>(),
    squareFootage: integer('square_footage'),
    genderPolicy: text('gender_policy'),
    description: text('description'),
    imageUrl: text('image_url'),
    ...timestamps
});

export type Room = typeof roomsTable.$inferSelect;
export type RoomId = Room['id'] & { __brand: 'RoomId' };
