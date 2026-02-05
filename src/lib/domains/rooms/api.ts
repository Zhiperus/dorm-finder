import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';
import { TanstackRequestOptions } from '../request-options';
import type { ListRooms, GetRoom, CreateRoom, UpdateRoom, DeleteRoom } from './types';

export class RoomsModule extends TanstackRequestOptions {
    namespace = 'rooms';

    list(): ApiQuery<ListRooms> {
        return {
            queryKey: [this.namespace],
            queryFn: async () => await this.api.rooms.$get().then(parseClientResponse)
        };
    }

    get(id: string): ApiQuery<GetRoom> {
        return {
            queryKey: [this.namespace, id],
            queryFn: async () =>
                await this.api.rooms[':id'].$get({ param: { id } }).then(parseClientResponse)
        };
    }

    create(): ApiMutation<CreateRoom> {
        return {
            mutationFn: async (data) => await this.api.rooms.$post(data).then(parseClientResponse)
        };
    }

    update(): ApiMutation<UpdateRoom> {
        return {
            mutationFn: async (data) =>
                await this.api.rooms[':id'].$patch(data).then(parseClientResponse)
        };
    }

    delete(): ApiMutation<DeleteRoom> {
        return {
            mutationFn: async (data) =>
                await this.api.rooms[':id'].$delete(data).then(parseClientResponse)
        };
    }
}
