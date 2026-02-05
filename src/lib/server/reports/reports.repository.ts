import { injectable } from '@needle-di/core';
import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';

@injectable()
export class ReportsRepository extends DrizzleRepository {
    findAll() {}
    findOneById() {}
    findOneByIdOrThrow() {}
    create() {}
    updateStatus() {}
    incrementDownloadCount() {}
}
