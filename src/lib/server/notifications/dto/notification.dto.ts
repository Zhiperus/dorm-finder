import { createSelectSchema, createInsertSchema } from 'drizzle-zod';

import { notificationsTable } from '../notifications.schema';

export const notificationDto = createSelectSchema(notificationsTable);
export const createNotificationDto = createInsertSchema(notificationsTable);
export const updateNotificationDto = createSelectSchema(notificationsTable).partial();

export type NotificationDto = typeof notificationDto;
export type CreateNotificationDto = typeof createNotificationDto;
export type UpdateNotificationDto = typeof updateNotificationDto;
