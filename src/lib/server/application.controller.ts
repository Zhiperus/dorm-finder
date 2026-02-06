import { inject, injectable } from '@needle-di/core';
import { contextStorage } from 'hono/context-storage';
import { requestId } from 'hono/request-id';

import { AccommodationsController } from './accommodations/accommodations.controller';
import { ApplicationsController } from './applications/applications.controller';
import { AuditController } from './audit/audit.controller';
import { BillingController } from './billing/billing.controller';
import { ConfigService } from './common/config/config.service';
import { Controller } from './common/factories/controller.factory';
import { browserSessions } from './common/middleware/browser-session.middleware';
import { rateLimit } from './common/middleware/rate-limit.middleware';
import { sessionManagement } from './common/middleware/session-management.middleware';
import { NotificationsController } from './notifications/notifications.controller';
import { OccupancyController } from './occupancy/occupancy.controller';
import { RedisService } from './redis/redis.service';
import { ReportsController } from './reports/reports.controller';
import { RoomsController } from './rooms/rooms.controller';
import { SessionsService } from './sessions/sessions.service';
import { UsersController } from './users/users.controller';

@injectable()
export class ApplicationController extends Controller {
  constructor(
    private sessionService = inject(SessionsService),
    private configService = inject(ConfigService),
    private redisService = inject(RedisService),
    private usersController = inject(UsersController),
    private accommodationsController = inject(AccommodationsController),
    private roomsController = inject(RoomsController),
    private applicationsController = inject(ApplicationsController),
    private occupancyController = inject(OccupancyController),
    private billingController = inject(BillingController),
    private reportsController = inject(ReportsController),
    private notificationsController = inject(NotificationsController),
    private auditController = inject(AuditController)
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
    return this.controller
      .basePath('/api')
      .use(requestId({ generator: () => crypto.randomUUID() }))
      .use(contextStorage())
      .use(browserSessions(this.configService))
      .use(sessionManagement(this.sessionService))
      .route('/', this.routes())
      .route('/', this.usersController.routes())
      .route('/', this.accommodationsController.routes())
      .route('/', this.roomsController.routes())
      .route('/', this.applicationsController.routes())
      .route('/', this.occupancyController.routes())
      .route('/', this.billingController.routes())
      .route('/', this.reportsController.routes())
      .route('/', this.notificationsController.routes())
      .route('/', this.auditController.routes());
  }
}
