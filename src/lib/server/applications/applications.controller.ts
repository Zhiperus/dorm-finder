import { injectable } from '@needle-di/core';
import { Controller } from '../common/factories/controller.factory';

@injectable()
export class ApplicationsController extends Controller {
    routes() {
        return this.controller
            .basePath('/applications')
            .get('/', async (c) => {})
            .get('/my-applications', async (c) => {})
            .get('/:id', async (c) => {})
            .post('/', async (c) => {})
            .patch('/:id', async (c) => {})
            .post('/:id/submit', async (c) => {})
            .post('/:id/review', async (c) => {})
            .post('/:id/approve', async (c) => {})
            .post('/:id/reject', async (c) => {})
            .post('/:id/waitlist', async (c) => {})
            .delete('/:id', async (c) => {});
    }
}
