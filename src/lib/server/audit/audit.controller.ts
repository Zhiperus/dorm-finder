import { injectable } from '@needle-di/core';

import { Controller } from '../common/factories/controller.factory';

@injectable()
export class AuditController extends Controller {
  routes() {
    return this.controller
      .basePath('/audit')
      .get('/', async (c) => {})
      .get('/user/:userId', async (c) => {})
      .get('/entity/:entityType/:entityId', async (c) => {})
      .get('/logs', async (c) => {});
  }
}
