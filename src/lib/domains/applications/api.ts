// @ts-nocheck
import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';

import { TanstackRequestOptions } from '../request-options';

import type {
  ListApplications,
  GetApplication,
  CreateApplication,
  UpdateApplication,
  DeleteApplication,
  ListDocuments,
  UploadDocument,
  DeleteDocument
} from './types';

export class ApplicationsModule extends TanstackRequestOptions {
  namespace = 'applications';

  list(): ApiQuery<ListApplications> {
    return {
      queryKey: [this.namespace],
      queryFn: async () => await this.api.applications.$get().then(parseClientResponse)
    };
  }

  get(id: string): ApiQuery<GetApplication> {
    return {
      queryKey: [this.namespace, id],
      queryFn: async () =>
        await this.api.applications[':id'].$get({ param: { id } }).then(parseClientResponse)
    };
  }

  create(): ApiMutation<CreateApplication> {
    return {
      mutationFn: async (data) => await this.api.applications.$post(data).then(parseClientResponse)
    };
  }

  update(): ApiMutation<UpdateApplication> {
    return {
      mutationFn: async (data) =>
        await this.api.applications[':id'].$patch(data).then(parseClientResponse)
    };
  }

  delete(): ApiMutation<DeleteApplication> {
    return {
      mutationFn: async (data) =>
        await this.api.applications[':id'].$delete(data).then(parseClientResponse)
    };
  }

  listDocuments(applicationId: string): ApiQuery<ListDocuments> {
    return {
      queryKey: [this.namespace, applicationId, 'documents'],
      queryFn: async () =>
        await this.api.applications[':id'].documents
          .$get({ param: { id: applicationId } })
          .then(parseClientResponse)
    };
  }

  uploadDocument(): ApiMutation<UploadDocument> {
    return {
      mutationFn: async (data) =>
        await this.api.applications[':id'].documents.$post(data).then(parseClientResponse)
    };
  }

  deleteDocument(): ApiMutation<DeleteDocument> {
    return {
      mutationFn: async (data) =>
        await this.api.applications[':id'].documents[':documentId']
          .$delete(data)
          .then(parseClientResponse)
    };
  }
}
