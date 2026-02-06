import { injectable } from '@needle-di/core';

import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';

@injectable()
export class ApplicationsRepository extends DrizzleRepository {
  findAll() {}
  findByStudent() {}
  findOneById() {}
  findOneByIdOrThrow() {}
  create() {}
  update() {}
  submit() {}
  review() {}
  approve() {}
  reject() {}
  waitlist() {}
  delete() {}
  getWaitingList() {}
}
