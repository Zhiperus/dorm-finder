import type { MiddlewareHandler } from 'hono';
import { createMiddleware } from 'hono/factory';
import { SessionsService } from '../../sessions/sessions.service';

export const sessionManagement = (sessionService: SessionsService): MiddlewareHandler =>
    createMiddleware(async (c, next) => {
        const sessionId = await sessionService.getSessionCookie();

        if (!sessionId) {
            c.set('session', null);
            return next();
        }

        // Validate the session
        const session = await sessionService.validateSession(sessionId);

        // If the session is not found, delete the cookie
        if (!session) sessionService.deleteSessionCookie();

        // If the session is fresh, refresh the cookie with the new expiration date
        if (session && session.fresh) sessionService.setSessionCookie(session);

        // Set the session in the context
        c.set('session', session);

        // Continue to the next middleware
        return next();
    });
