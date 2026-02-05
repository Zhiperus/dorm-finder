import type { MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { Forbidden, Unauthorized } from '../utils/exceptions';
import type { User } from '$lib/server/users/users.schema';
import type { SessionDto } from '$lib/server/sessions/dto/session.dto';

type AuthStates = 'session' | 'none';
type AuthedReturnType = typeof authed;
type UnauthedReturnType = typeof unauthed;

export function authState(state: 'session'): AuthedReturnType;
export function authState(state: 'none'): UnauthedReturnType;
export function authState(state: AuthStates): AuthedReturnType | UnauthedReturnType {
    if (state === 'session') return authed;
    return unauthed;
}

const authed: MiddlewareHandler<{
    Variables: {
        session: SessionDto;
    };
}> = createMiddleware(async (c, next) => {
    if (!c.var.session) {
        throw Unauthorized('You must be logged in to access this resource');
    }
    return next();
});

const unauthed: MiddlewareHandler<{
    Variables: {
        session: null;
    };
}> = createMiddleware(async (c, next) => {
    if (c.var.session) {
        throw Unauthorized('You must be logged out to access this resource');
    }
    return next();
});

export function requireRole(...allowedRoles: User['role'][]) {
    return createMiddleware<{
        Variables: { session: SessionDto };
    }>(async (c, next) => {
        const session = c.var.session;

        if (!session) {
            throw Unauthorized('You must be logged in to access this resource');
        }

        if (!allowedRoles.includes(session.role)) {
            throw Forbidden('You do not have permission to perform this action');
        }

        await next();
    });
}
