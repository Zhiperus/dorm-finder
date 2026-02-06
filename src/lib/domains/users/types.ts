// @ts-nocheck
import type { Api } from '$lib/utils/types';

export type Me = Api['users']['me']['$get'];
export type UpdateUser = Api['users']['me']['$patch'];
