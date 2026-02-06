import { injectable } from '@needle-di/core';

import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';

@injectable()
export class BillingRepository extends DrizzleRepository {
  findAll() {}
  findByStudent() {}
  findOneById() {}
  findOneByIdOrThrow() {}
  create() {}
  recordPayment() {}
  update() {}
  getRevenueSummary() {}
  getUnpaidFees() {}
  applyLateFees() {}
}
