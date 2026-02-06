import { injectable } from '@needle-di/core';

import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';

@injectable()
export class AuditRepository extends DrizzleRepository {
  findAll() {}
  findByUser() {}
  findByEntity() {}
  searchLogs() {}
  create() {}
  getActivitySummary() {}
}
