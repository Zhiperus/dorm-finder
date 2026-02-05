import { rateLimiter } from 'hono-rate-limiter';
import { RedisStore } from 'rate-limit-redis';
import type { Context } from 'hono';
import type { HonoEnv } from '../utils/hono';
import type { Redis } from 'ioredis';
import { routePath } from 'hono/route';

export function rateLimit({
    limit,
    minutes,
    key = '',
    client
}: {
    limit: number;
    minutes: number;
    key?: string;
    client: Redis;
}) {
    return rateLimiter({
        windowMs: minutes * 60 * 1000,
        limit,
        standardHeaders: 'draft-6',
        keyGenerator: (c: Context<HonoEnv>) => {
            const id = c.var.session?.id;

            const forwardedFor = c.req.header('x-forwarded-for');
            const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown_ip';

            const clientKey = id || ip;
            const pathKey = key || routePath(c);

            return `${clientKey}_${pathKey}`;
        },
        store: new RedisStore({
            // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
            sendCommand: (...args: string[]) => client.call(...args)
        }) as never
    });
}
