import { injectable } from '@needle-di/core';
import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';

@injectable()
export class RoomsRepository extends DrizzleRepository {
    findMany() {}
    findOneById() {}
    findOneByIdOrThrow() {}
    create() {}
    update() {}
    delete() {}
    findByAccommodation() {}
    getAvailability() {}
    findAvailableByType() {}
    updateAvailability() {}
}
