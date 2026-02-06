import { injectable } from '@needle-di/core';

import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';

@injectable()
export class OccupancyRepository extends DrizzleRepository {
  findAll() {}
  findByStudent() {}
  findByRoom() {}
  findOneById() {}
  findOneByIdOrThrow() {}
  create() {}
  checkIn() {}
  checkOut() {}
  update() {}
  getOccupancyStats() {}
}
