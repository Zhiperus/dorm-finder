import { injectable } from '@needle-di/core';
import { z } from 'zod';

import { type EnvDto, envDto } from './dto/env.dto';

import * as env from '$env/static/private';

@injectable()
export class ConfigService {
  envs: EnvDto;

  constructor() {
    this.envs = this.parseEnvs()!;
  }

  buildDatabaseUrl() {
    return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.ENV === 'dev' ? 'localhost' : process.env.DB_HOST}:5432/${process.env.DB_NAME}?sslmode=disable`;
  }

  private parseEnvs() {
    return envDto.parse(env);
  }

  validateEnvs() {
    try {
      return envDto.parse(env);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const tree = z.treeifyError(err);
        const errorMessage = Object.entries(tree)
          .map(([field, errors]) => (errors ? `${field}: ${errors.join(', ')}` : field))
          .join('\n  ');
        throw new Error(`Missing environment variables:\n  ${errorMessage}`);
      }
    }
  }
}
