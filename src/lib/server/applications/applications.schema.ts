import { pgEnum, pgTable, text, timestamp, uuid, integer, jsonb } from 'drizzle-orm/pg-core';
import { timestamps } from '../common/utils/drizzle';
import { usersTable } from '../users/users.schema';

export const applicationStatusEnum = pgEnum('application_status', [
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
    'WAITLISTED',
    'WITHDRAWN',
    'CANCELLED'
]);

export const applicationPriorityEnum = pgEnum('application_priority', [
    'NORMAL',
    'HIGH',
    'URGENT',
    'PREFERENCE'
]);

export const termEnum = pgEnum('term', ['FALL', 'SPRING', 'SUMMER', 'ACADEMIC_YEAR']);

export const documentTypeEnum = pgEnum('document_type', [
    'PROOF_OF_ENROLLMENT',
    'ID_CARD',
    'MEDICAL_CERTIFICATE',
    'FINANCIAL_DOCUMENT',
    'PARENT_GUARDIAN_CONSENT',
    'OTHER'
]);

export const applicationsTable = pgTable('applications', {
    id: uuid('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    studentId: uuid('student_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    preferredAccommodationId: uuid('preferred_accommodation_id'),
    preferredRoomType: text('preferred_room_type'),
    term: termEnum('term').notNull(),
    academicYear: integer('academic_year').notNull(),
    status: applicationStatusEnum('status').default('DRAFT').notNull(),
    priority: applicationPriorityEnum('priority').default('NORMAL').notNull(),
    submissionDeadline: timestamp('submission_deadline', { mode: 'date' }),
    submittedAt: timestamp('submitted_at', { mode: 'date' }),
    reviewedBy: uuid('reviewed_by'),
    reviewedAt: timestamp('reviewed_at', { mode: 'date' }),
    reviewNotes: text('review_notes'),
    specialRequirements: text('special_requirements'),
    medicalConsiderations: text('medical_considerations'),
    roommatePreference: text('roommate_preference'),
    flooringPreference: text('flooring_preference'),
    lifestylePreferences: jsonb('lifestyle_preferences').$type<{
        smokingPolicy: string;
        quietHours: string;
        guestsPolicy: string;
    }>(),
    ...timestamps
});

export type Application = typeof applicationsTable.$inferSelect;
export type ApplicationId = Application['id'] & { __brand: 'ApplicationId' };

export const documentsTable = pgTable('documents', {
    id: uuid('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    applicationId: uuid('application_id')
        .notNull()
        .references(() => applicationsTable.id, { onDelete: 'cascade' }),
    studentId: uuid('student_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    type: documentTypeEnum('type').notNull(),
    fileName: text('file_name').notNull(),
    fileKey: text('file_key').notNull(),
    fileSize: integer('file_size').notNull(),
    mimeType: text('mime_type').notNull(),
    status: text('status').default('PENDING').notNull(),
    verifiedBy: uuid('verified_by'),
    verifiedAt: timestamp('verified_at', { mode: 'date' }),
    verificationNotes: text('verification_notes'),
    ...timestamps
});

export type Document = typeof documentsTable.$inferSelect;
export type DocumentId = Document['id'] & { __brand: 'DocumentId' };
