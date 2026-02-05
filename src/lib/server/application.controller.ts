import { inject, injectable } from '@needle-di/core';
import { contextStorage } from 'hono/context-storage';
import { requestId } from 'hono/request-id';
import { UsersController } from './users/users.controller';
import { Controller } from './common/factories/controller.factory';
import { rateLimit } from './common/middleware/rate-limit.middleware';
import { RedisService } from './redis/redis.service';
import { browserSessions } from './common/middleware/browser-session.middleware';
import { ConfigService } from './common/config/config.service';
import { SessionsService } from './sessions/sessions.service';
import { sessionManagement } from './common/middleware/session-management.middleware';

@injectable()
export class ApplicationController extends Controller {
    constructor(
        private sessionService = inject(SessionsService),
        private configService = inject(ConfigService),
        private redisService = inject(RedisService),
        private usersController = inject(UsersController)
    ) {
        super();
    }

    routes() {
        return this.controller
            .get('/', (c) => {
                return c.json({ status: 'ok' });
            })
            .get('/healthz', (c) => {
                return c.json({ status: 'ok' });
            })
            .get(
                '/rate-limit',
                rateLimit({ limit: 3, minutes: 1, client: this.redisService.redis }),
                (c) => {
                    return c.json({ message: 'Test!' });
                }
            );
    }

    registerControllers() {
        return (
            this.controller
                .basePath('/api')
                .use(requestId({ generator: () => crypto.randomUUID() }))
                .use(contextStorage())
                .use(browserSessions(this.configService))
                .use(sessionManagement(this.sessionService))
                .route('/', this.routes())
                // .route('/iam', this.iamController.routes())
                .route('/', this.usersController.routes())
        );
    }
}
