import { injectable } from '@needle-di/core';

@injectable()
export class NotificationsService {
    findByUser() {}
    findUnreadByUser() {}
    getUnreadCount() {}
    findOneById() {}
    markAsRead() {}
    markAllAsRead() {}
    delete() {}
    send() {}
    sendApplicationReviewNotification() {}
    sendCheckInNotification() {}
    sendCheckOutNotification() {}
    sendPaymentDueNotification() {}
    sendPaymentReceivedNotification() {}
}
