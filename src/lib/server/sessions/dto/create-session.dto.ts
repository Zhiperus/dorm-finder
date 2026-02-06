import { z } from 'zod';

import type { UserId } from '$lib/server/users/users.schema';

export const createSessionDto = z.object({
  id: z.uuid(),
  userId: z.custom<UserId>((val) => typeof val === 'string'),
  role: z.enum(['STUDENT', 'DORM_MANAGER', 'ADMIN', 'GUEST']),
  createdAt: z.coerce.date(),
  expiresAt: z.coerce.date()
});

export type CreateSessionDto = z.infer<typeof createSessionDto>;
