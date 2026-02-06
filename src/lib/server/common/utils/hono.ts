import { Hono } from 'hono';

import type { SessionDto } from '$lib/server/sessions/dto/session.dto';

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
