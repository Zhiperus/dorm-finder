import { injectable } from '@needle-di/core';

import { Controller } from '../common/factories/controller.factory';

@injectable()
export class BillingController extends Controller {
  routes() {
    return this.controller
      .basePath('/billing')
      .get('/', async (c) => {})
      .get('/my-bills', async (c) => {})
      .get('/my-bills/:id', async (c) => {})
      .get('/summary', async (c) => {})
      .get('/unpaid', async (c) => {})
      .post('/', async (c) => {})
      .post('/:id/pay', async (c) => {})
      .patch('/:id', async (c) => {});
  }
}
