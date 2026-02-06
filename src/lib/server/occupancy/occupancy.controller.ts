import { injectable } from '@needle-di/core';

import { Controller } from '../common/factories/controller.factory';

@injectable()
export class OccupancyController extends Controller {
  routes() {
    return this.controller
      .basePath('/occupancy')
      .get('/', async (c) => {})
      .get('/student/:studentId', async (c) => {})
      .get('/room/:roomId', async (c) => {})
      .get('/:id', async (c) => {})
      .post('/', async (c) => {})
      .post('/:id/check-in', async (c) => {})
      .post('/:id/check-out', async (c) => {})
      .patch('/:id', async (c) => {});
  }
}
