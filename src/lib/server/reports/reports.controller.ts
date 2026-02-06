import { injectable } from '@needle-di/core';
import { Controller } from '../common/factories/controller.factory';

@injectable()
export class ReportsController extends Controller {
    routes() {
        return this.controller
            .basePath('/reports')
            .get('/', async (c) => {})
            .get('/occupancy', async (c) => {})
            .get('/waiting-list', async (c) => {})
            .get('/student-history', async (c) => {})
            .get('/revenue', async (c) => {})
            .get('/unpaid-fees', async (c) => {})
            .get('/application-summary', async (c) => {})
            .get('/room-utilization', async (c) => {})
            .post('/generate', async (c) => {})
            .get('/:id/download', async (c) => {});
    }
}
