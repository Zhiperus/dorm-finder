import { inject } from '@needle-di/core';

import { DrizzleService } from '$lib/server/db/drizzle.service';

export abstract class DrizzleRepository {
  constructor(protected readonly drizzle: DrizzleService = inject(DrizzleService)) {}
}
