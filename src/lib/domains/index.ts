import type { ClientRequestOptions } from 'hono';
import { TanstackRequestOptions } from './request-options';
import { UsersModule } from './users/api';

class ApiModule extends TanstackRequestOptions {
    users = new UsersModule(this.opts);
}

export const api = (opts?: ClientRequestOptions) => new ApiModule(opts);
