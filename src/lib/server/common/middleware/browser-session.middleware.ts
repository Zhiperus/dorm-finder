import type { MiddlewareHandler } from 'hono';
import { getSignedCookie, setSignedCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import type { ConfigService } from '../config/config.service';

export const browserSessions = (config: ConfigService): MiddlewareHandler =>
    createMiddleware(async (c, next) => {
        const BROWSER_SESSION_COOKIE_NAME = '_id';

        const secret = config.envs.SIGNING_SECRET;
        const isProd = config.envs.ENV === 'prod';

        const browserSessionCookie = await getSignedCookie(c, secret, BROWSER_SESSION_COOKIE_NAME);

        let browserSessionId = browserSessionCookie;

        if (!browserSessionCookie) {
            browserSessionId = crypto.randomUUID();
            await setSignedCookie(c, BROWSER_SESSION_COOKIE_NAME, browserSessionId, secret, {
                httpOnly: true,
                sameSite: 'lax',
                secure: isProd,
                path: '/'
            });
        }

        c.set('browserSessionId', browserSessionId);

        await next();
    });
