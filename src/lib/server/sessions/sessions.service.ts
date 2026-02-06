import { inject, injectable } from '@needle-di/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getContext } from 'hono/context-storage'; // Direct import
import { deleteCookie, getSignedCookie, setSignedCookie } from 'hono/cookie';


import { ConfigService } from '$lib/server/common/config/config.service';
import type { HonoEnv } from '$lib/server/common/utils/hono';
import type { User, UserId } from '$lib/server/users/users.schema';

import { SessionsRepository } from './sessions.repository';

import type { CreateSessionDto } from './dto/create-session.dto';
import type { SessionDto } from './dto/session.dto';

dayjs.extend(relativeTime);

@injectable()
export class SessionsService {
  private readonly sessionCookieName = 'session';

  constructor(
    private sessionsRepository = inject(SessionsRepository),
    private configService = inject(ConfigService)
  ) {}

  /**
   * Private helper to get the current Hono context.
   * Replaces the old RequestContextService.
   */
  private get c() {
    return getContext<HonoEnv>();
  }

  /**
   * Retrieves the current validated session from the Context (if middleware set it).
   * Useful if you need to access the session/user in other services.
   */
  get currentSession() {
    return this.c.get('session');
  }

  get currentUserId() {
    return this.c.get('session')?.userId;
  }

  setSessionCookie(session: SessionDto) {
    return setSignedCookie(
      this.c,
      this.sessionCookieName,
      session.id,
      this.configService.envs.SIGNING_SECRET,
      {
        httpOnly: true,
        sameSite: 'lax',
        secure: this.configService.envs.ENV === 'prod',
        path: '/',
        expires: session.expiresAt
      }
    );
  }

  async getSessionCookie(): Promise<string | null> {
    const session = await getSignedCookie(
      this.c,
      this.configService.envs.SIGNING_SECRET,
      this.sessionCookieName
    );
    return session || null;
  }

  deleteSessionCookie() {
    return deleteCookie(this.c, this.sessionCookieName);
  }

  async createSession(userId: UserId, role: User['role']): Promise<SessionDto> {
    const session: CreateSessionDto = {
      id: crypto.randomUUID(),
      userId,
      role,
      createdAt: dayjs().toDate(),
      expiresAt: dayjs().add(30, 'day').toDate()
    };

    await this.sessionsRepository.create(session);
    return { ...session, fresh: true };
  }

  async validateSession(sessionId: string): Promise<SessionDto | null> {
    // Check if session exists
    const existingSession = await this.sessionsRepository.get(sessionId);

    // If session does not exist, return null
    if (!existingSession) return null;

    // If session exists, check if it should be extended
    const shouldExtendSession = dayjs(existingSession.expiresAt).diff(Date.now(), 'day') < 15;

    // If session should be extended, update the session in the database
    if (shouldExtendSession) {
      existingSession.expiresAt = dayjs().add(30, 'day').toDate();
      await this.sessionsRepository.create({ ...existingSession });
      return { ...existingSession, fresh: true };
    }

    return { ...existingSession, fresh: false };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    await this.sessionsRepository.delete(sessionId);
  }
}
