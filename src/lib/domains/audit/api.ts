// @ts-nocheck
import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';

import { TanstackRequestOptions } from '../request-options';

import type {
  ListAuditLogs,
  GetAuditLog,
  ExportAuditLogs,
  GetUserAuditTrail,
  GetEntityAuditTrail
} from './types';

export class AuditModule extends TanstackRequestOptions {
  namespace = 'audit';

  list(): ApiQuery<ListAuditLogs> {
    return {
      queryKey: [this.namespace],
      queryFn: async () => await this.api.audit.$get().then(parseClientResponse)
    };
  }

  get(id: string): ApiQuery<GetAuditLog> {
    return {
      queryKey: [this.namespace, id],
      queryFn: async () =>
        await this.api.audit[':id'].$get({ param: { id } }).then(parseClientResponse)
    };
  }

  export(): ApiMutation<ExportAuditLogs> {
    return {
      mutationFn: async (data) => await this.api.audit.export.$get(data).then(parseClientResponse)
    };
  }

  getUserAuditTrail(userId: string): ApiQuery<GetUserAuditTrail> {
    return {
      queryKey: [this.namespace, 'user', userId],
      queryFn: async () =>
        await this.api.audit.user[':userId'].$get({ param: { userId } }).then(parseClientResponse)
    };
  }

  getEntityAuditTrail(entityType: string, entityId: string): ApiQuery<GetEntityAuditTrail> {
    return {
      queryKey: [this.namespace, 'entity', entityType, entityId],
      queryFn: async () =>
        await this.api.audit.entity[':entityType'][':entityId']
          .$get({ param: { entityType, entityId } })
          .then(parseClientResponse)
    };
  }
}
