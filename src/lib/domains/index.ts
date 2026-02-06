import type { ClientRequestOptions } from 'hono';
import { TanstackRequestOptions } from './request-options';
import { UsersModule } from './users/api';
import { AccommodationsModule } from './accommodations/api';
import { RoomsModule } from './rooms/api';
import { ApplicationsModule } from './applications/api';
import { OccupancyModule } from './occupancy/api';
import { BillingModule } from './billing/api';
import { ReportsModule } from './reports/api';
import { NotificationsModule } from './notifications/api';
import { AuditModule } from './audit/api';

class ApiModule extends TanstackRequestOptions {
    users = new UsersModule(this.opts);
    accommodations = new AccommodationsModule(this.opts);
    rooms = new RoomsModule(this.opts);
    applications = new ApplicationsModule(this.opts);
    occupancy = new OccupancyModule(this.opts);
    billing = new BillingModule(this.opts);
    reports = new ReportsModule(this.opts);
    notifications = new NotificationsModule(this.opts);
    audit = new AuditModule(this.opts);
}

export const api = (opts?: ClientRequestOptions) => new ApiModule(opts);
