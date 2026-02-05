import { injectable } from '@needle-di/core';
import { RedisRepository } from '../common/factories/redis-repository.factory';
import { createSessionDto, type CreateSessionDto } from './dto/create-session.dto';

@injectable()
export class SessionsRepository extends RedisRepository<'session'> {
    constructor() {
        super('session');
    }

    async get(id: string): Promise<CreateSessionDto | null> {
        const response = await this.redis.get({ prefix: this.prefix, key: id });
        if (!response) return null;

        try {
            const parsed = JSON.parse(response);
            return createSessionDto.parse(parsed);
        } catch {
            return null;
        }
    }

    delete(id: string) {
        return this.redis.delete({ prefix: this.prefix, key: id });
    }

    create(createSessionDto: CreateSessionDto) {
        return this.redis.setWithExpiry({
            prefix: this.prefix,
            key: createSessionDto.id,
            value: JSON.stringify(createSessionDto),
            expiry: Math.floor(+createSessionDto.expiresAt / 1000)
        });
    }
}
