import { injectable } from '@needle-di/core';
import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';

@injectable()
export class NotificationsRepository extends DrizzleRepository {
    findByUser() {}
    findUnreadByUser() {}
    getUnreadCount() {}
    findOneById() {}
    findOneByIdOrThrow() {}
    create() {}
    markAsRead() {}
    markAllAsRead() {}
    delete() {}
}
