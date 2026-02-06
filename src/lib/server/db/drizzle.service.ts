import { inject, injectable } from '@needle-di/core';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import Pool from 'pg-pool';

import { ConfigService } from '../common/config/config.service';

import * as drizzleSchema from './drizzle-schema';

@injectable()
export class DrizzleService {
  public db: NodePgDatabase<typeof drizzleSchema>;
  public schema = drizzleSchema;
  constructor(private configService = inject(ConfigService)) {
    this.db = drizzle(
      new Pool({
        connectionString: this.configService.buildDatabaseUrl()
      }),
      { schema: drizzleSchema, casing: 'snake_case' }
    );
  }
}
