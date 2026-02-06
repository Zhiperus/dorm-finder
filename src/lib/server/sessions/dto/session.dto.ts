import type { CreateSessionDto } from './create-session.dto';

export type SessionDto = CreateSessionDto & {
  fresh: boolean;
};
