import { DrizzleService } from '$lib/server/db/drizzle.service';
import { inject } from '@needle-di/core';

export abstract class DrizzleRepository {
    constructor(protected readonly drizzle: DrizzleService = inject(DrizzleService)) {}
}
