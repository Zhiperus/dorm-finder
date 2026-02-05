import { z } from 'zod';

export const envDto = z.object({
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
    REDIS_URL: z.string(),
    SIGNING_SECRET: z.string(),
    ENV: z.enum(['dev', 'prod']),
    PORT: z.coerce.number(),
    STORAGE_HOST: z.string(),
    STORAGE_PORT: z.coerce.number(),
    STORAGE_ACCESS_KEY: z.string(),
    STORAGE_SECRET_KEY: z.string()
});

export type EnvDto = z.infer<typeof envDto>;
