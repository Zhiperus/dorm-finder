import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';
import { TanstackRequestOptions } from '../request-options';
import type {
    ListNotifications,
    GetNotification,
    MarkAsRead,
    MarkAllAsRead,
    DeleteNotification,
    GetUnreadCount
} from './types';

export class NotificationsModule extends TanstackRequestOptions {
    namespace = 'notifications';

    list(): ApiQuery<ListNotifications> {
        return {
            queryKey: [this.namespace],
            queryFn: async () => await this.api.notifications.$get().then(parseClientResponse)
        };
    }

    get(id: string): ApiQuery<GetNotification> {
        return {
            queryKey: [this.namespace, id],
            queryFn: async () =>
                await this.api.notifications[':id']
                    .$get({ param: { id } })
                    .then(parseClientResponse)
        };
    }

    markAsRead(): ApiMutation<MarkAsRead> {
        return {
            mutationFn: async (data) =>
                await this.api.notifications[':id'].read.$post(data).then(parseClientResponse)
        };
    }

    markAllAsRead(): ApiMutation<MarkAllAsRead> {
        return {
            mutationFn: async () =>
                await this.api.notifications['read-all'].$post().then(parseClientResponse)
        };
    }

    delete(): ApiMutation<DeleteNotification> {
        return {
            mutationFn: async (data) =>
                await this.api.notifications[':id'].$delete(data).then(parseClientResponse)
        };
    }

    getUnreadCount(): ApiQuery<GetUnreadCount> {
        return {
            queryKey: [this.namespace, 'unread-count'],
            queryFn: async () =>
                await this.api.notifications['unread-count'].$get().then(parseClientResponse)
        };
    }
}
