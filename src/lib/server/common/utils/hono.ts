import type { SessionDto } from '$lib/server/sessions/dto/session.dto';
import { Hono } from 'hono';

export type HonoEnv = {
    Variables: {
        session: SessionDto | null;
        browserSessionId: string;
        requestId: string;
    };
};

export function createHono() {
    return new Hono<HonoEnv>();
}
