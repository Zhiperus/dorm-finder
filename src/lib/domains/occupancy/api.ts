// @ts-nocheck
import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';

import { TanstackRequestOptions } from '../request-options';

import type {
  ListOccupancyRecords,
  GetOccupancyRecord,
  CreateOccupancyRecord,
  UpdateOccupancyRecord,
  DeleteOccupancyRecord,
  CheckIn,
  CheckOut,
  GetStudentOccupancy,
  GetRoomOccupancy
} from './types';

export class OccupancyModule extends TanstackRequestOptions {
  namespace = 'occupancy';

  list(): ApiQuery<ListOccupancyRecords> {
    return {
      queryKey: [this.namespace],
      queryFn: async () => await this.api.occupancy.$get().then(parseClientResponse)
    };
  }

  get(id: string): ApiQuery<GetOccupancyRecord> {
    return {
      queryKey: [this.namespace, id],
      queryFn: async () =>
        await this.api.occupancy[':id'].$get({ param: { id } }).then(parseClientResponse)
    };
  }

  create(): ApiMutation<CreateOccupancyRecord> {
    return {
      mutationFn: async (data) => await this.api.occupancy.$post(data).then(parseClientResponse)
    };
  }

  update(): ApiMutation<UpdateOccupancyRecord> {
    return {
      mutationFn: async (data) =>
        await this.api.occupancy[':id'].$patch(data).then(parseClientResponse)
    };
  }

  delete(): ApiMutation<DeleteOccupancyRecord> {
    return {
      mutationFn: async (data) =>
        await this.api.occupancy[':id'].$delete(data).then(parseClientResponse)
    };
  }

  checkIn(): ApiMutation<CheckIn> {
    return {
      mutationFn: async (data) =>
        await this.api.occupancy['check-in'].$post(data).then(parseClientResponse)
    };
  }

  checkOut(): ApiMutation<CheckOut> {
    return {
      mutationFn: async (data) =>
        await this.api.occupancy['check-out'].$post(data).then(parseClientResponse)
    };
  }

  getStudentOccupancy(studentId: string): ApiQuery<GetStudentOccupancy> {
    return {
      queryKey: [this.namespace, 'student', studentId],
      queryFn: async () =>
        await this.api.occupancy.student[':studentId']
          .$get({ param: { studentId } })
          .then(parseClientResponse)
    };
  }

  getRoomOccupancy(roomId: string): ApiQuery<GetRoomOccupancy> {
    return {
      queryKey: [this.namespace, 'room', roomId],
      queryFn: async () =>
        await this.api.occupancy.room[':roomId']
          .$get({ param: { roomId } })
          .then(parseClientResponse)
    };
  }
}
