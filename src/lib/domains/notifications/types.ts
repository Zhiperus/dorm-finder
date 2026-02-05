import type { Api } from '$lib/utils/types';

export type ListNotifications = Api['notifications']['$get'];
export type GetNotification = Api['notifications'][':id']['$get'];
export type MarkAsRead = Api['notifications'][':id']['read']['$post'];
export type MarkAllAsRead = Api['notifications']['read-all']['$post'];
export type DeleteNotification = Api['notifications'][':id']['$delete'];
export type GetUnreadCount = Api['notifications']['unread-count']['$get'];
