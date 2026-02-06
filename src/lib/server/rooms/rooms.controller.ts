import { injectable } from '@needle-di/core';

import { Controller } from '../common/factories/controller.factory';

@injectable()
export class RoomsController extends Controller {
  routes() {
    return this.controller
      .basePath('/rooms')
      .get('/', async (c) => {})
      .get('/:id', async (c) => {})
      .get('/:id/availability', async (c) => {})
      .post('/', async (c) => {})
      .patch('/:id', async (c) => {})
      .delete('/:id', async (c) => {});
  }
}
