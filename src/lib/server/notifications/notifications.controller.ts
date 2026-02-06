import { injectable } from '@needle-di/core';

import { Controller } from '../common/factories/controller.factory';

@injectable()
export class NotificationsController extends Controller {
  routes() {
    return this.controller
      .basePath('/notifications')
      .get('/', async (c) => {})
      .get('/unread', async (c) => {})
      .get('/count', async (c) => {})
      .get('/:id', async (c) => {})
      .patch('/:id/read', async (c) => {})
      .patch('/read-all', async (c) => {})
      .delete('/:id', async (c) => {})
      .post('/send', async (c) => {});
  }
}
