// @ts-nocheck
import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';

import { TanstackRequestOptions } from '../request-options';

import type { Me, UpdateUser } from './types';

export class UsersModule extends TanstackRequestOptions {
  namespace = 'users';

  me(): ApiQuery<Me> {
    return {
      queryKey: [this.namespace, 'me'],
      queryFn: async () => await this.api.users.me.$get().then(parseClientResponse)
    };
  }

  update(): ApiMutation<UpdateUser> {
    return {
      mutationFn: async (data) => await this.api.users.me.$patch(data).then(parseClientResponse)
    };
  }
}
