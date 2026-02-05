import { RedisService } from '$lib/server/redis/redis.service';
import { inject } from '@needle-di/core';

export abstract class RedisRepository<T extends string> {
    constructor(
        public readonly prefix: T,
        protected readonly redis = inject(RedisService)
    ) {}
}
