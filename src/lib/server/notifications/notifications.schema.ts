import { pgEnum, pgTable, text, timestamp, uuid, jsonb, boolean } from 'drizzle-orm/pg-core';
import { timestamps } from '../common/utils/drizzle';
import { usersTable } from '../users/users.schema';

export const notificationTypeEnum = pgEnum('notification_type', [
    'APPLICATION_SUBMITTED',
    'APPLICATION_REVIEWED',
    'APPLICATION_APPROVED',
    'APPLICATION_REJECTED',
    'APPLICATION_WAITLISTED',
    'DOCUMENT_REQUIRED',
    'DOCUMENT_VERIFIED',
    'ROOM_ASSIGNED',
    'CHECK_IN_REMINDER',
    'CHECK_OUT_REMINDER',
    'PAYMENT_DUE',
    'PAYMENT_RECEIVED',
    'PAYMENT_OVERDUE',
    'GENERAL_ANNOUNCEMENT',
    'MAINTENANCE_REQUEST',
    'MAINTENANCE_COMPLETED',
    'POLICY_UPDATE',
    'SYSTEM_ALERT'
]);

export const notificationChannelEnum = pgEnum('notification_channel', [
    'IN_APP',
    'EMAIL',
    'SMS',
    'PUSH'
]);

export const notificationStatusEnum = pgEnum('notification_status', [
    'PENDING',
    'SENT',
    'DELIVERED',
    'READ',
    'FAILED',
    'CANCELLED'
]);

export const notificationsTable = pgTable('notifications', {
    id: uuid('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: uuid('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    type: notificationTypeEnum('type').notNull(),
    channel: notificationChannelEnum('channel').default('IN_APP').notNull(),
    title: text('title').notNull(),
    message: text('message').notNull(),
    data: jsonb('data').$type<Record<string, unknown>>(),
    status: notificationStatusEnum('status').default('PENDING').notNull(),
    sentAt: timestamp('sent_at', { mode: 'date' }),
    readAt: timestamp('read_at', { mode: 'date' }),
    read: boolean('read').default(false).notNull(),
    priority: text('priority').default('NORMAL'),
    expiresAt: timestamp('expires_at', { mode: 'date' }),
    ...timestamps
});

export type Notification = typeof notificationsTable.$inferSelect;
export type NotificationId = Notification['id'] & { __brand: 'NotificationId' };
