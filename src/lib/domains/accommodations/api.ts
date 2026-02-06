// @ts-nocheck
import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';
import { TanstackRequestOptions } from '../request-options';
import type {
    ListAccommodations,
    GetAccommodation,
    CreateAccommodation,
    UpdateAccommodation,
    DeleteAccommodation
} from './types';

export class AccommodationsModule extends TanstackRequestOptions {
    namespace = 'accommodations';

    list(): ApiQuery<ListAccommodations> {
        return {
            queryKey: [this.namespace],
            queryFn: async () => await this.api.accommodations.$get().then(parseClientResponse)
        };
    }

    get(id: string): ApiQuery<GetAccommodation> {
        return {
            queryKey: [this.namespace, id],
            queryFn: async () =>
                await this.api.accommodations[':id']
                    .$get({ param: { id } })
                    .then(parseClientResponse)
        };
    }

    create(): ApiMutation<CreateAccommodation> {
        return {
            mutationFn: async (data) =>
                await this.api.accommodations.$post(data).then(parseClientResponse)
        };
    }

    update(): ApiMutation<UpdateAccommodation> {
        return {
            mutationFn: async (data) =>
                await this.api.accommodations[':id'].$patch(data).then(parseClientResponse)
        };
    }

    delete(): ApiMutation<DeleteAccommodation> {
        return {
            mutationFn: async (data) =>
                await this.api.accommodations[':id'].$delete(data).then(parseClientResponse)
        };
    }
}
