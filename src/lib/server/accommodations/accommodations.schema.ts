import { pgEnum, pgTable, text, uuid, integer, jsonb } from 'drizzle-orm/pg-core';

import { timestamps } from '../common/utils/drizzle';

export const accommodationTypeEnum = pgEnum('accommodation_type', [
  'DORMITORY',
  'APARTMENT',
  'RESIDENCE_HALL',
  'FRATERNITY_SORORITY',
  'PARTNER_HOUSING'
]);

export const accommodationStatusEnum = pgEnum('accommodation_status', [
  'ACTIVE',
  'INACTIVE',
  'UNDER_MAINTENANCE',
  'FULL'
]);

export const accommodationsTable = pgTable('accommodations', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  type: accommodationTypeEnum('type').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  state: text('state'),
  zipCode: text('zip_code'),
  country: text('country').default('USA').notNull(),
  totalCapacity: integer('total_capacity').notNull(),
  currentOccupancy: integer('current_occupancy').default(0).notNull(),
  managerId: uuid('manager_id'),
  status: accommodationStatusEnum('status').default('ACTIVE').notNull(),
  amenities: jsonb('amenities').$type<string[]>(),
  description: text('description'),
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  website: text('website'),
  imageUrl: text('image_url'),
  ...timestamps
});

export type Accommodation = typeof accommodationsTable.$inferSelect;
export type AccommodationId = Accommodation['id'] & { __brand: 'AccommodationId' };
